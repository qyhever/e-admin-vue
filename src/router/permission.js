import router from './'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/local'
import { clearPending } from '@/api/request'
import { hasPermission, getDocumentTitle } from '@/utils'
import store from '@/store'

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  clearPending()
  NProgress.start()
  const token = getToken()
  if (token) {
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      if (hasPermission(to, store.getters.user.resourceCodes)) {
        next()
      } else {
        next('/forbidden')
      }
    }
  } else {
    if (whiteList.indexOf(to.path) >= 0) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }

})

router.afterEach((to) => {
  NProgress.done()
  document.title = getDocumentTitle(to)
})

// 路由懒加载的情况下，访问当前应用进行路由跳转时都是实时动态的从服务器上拉取相应模块的js文件
// 如果我们改完代码打包上线，js文件名更换了，路由跳转的时候由于页面并未刷新，所以还是访问的原来的文件名，就会出现找不到模块的错误。
// 此错误只会发生在生产环境
// 一般不用刻意处理，刷新浏览器就 ok 了
// 代码 hack，监听到路由报错之后进行页面刷新操作
router.onError(error => {
  const pattern = /Loading chunk .+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  const targetPath = router.history.pending.fullPath
  if (isChunkLoadFailed) {
    router.replace(targetPath)
  }
})
