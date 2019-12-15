import router from './'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/local'
import { clearPending } from '@/utils/axios'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login']
// router before each
router.beforeEach(async (to, from, next) => {
  clearPending()
  NProgress.start()
  const token = getToken()
  if (token) {
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      next()
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
// router after each
router.afterEach(() => {
  NProgress.done()
})
