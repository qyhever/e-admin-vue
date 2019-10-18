import router from './'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/local'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = [ '/login' ]
// router before each
router.beforeEach(async(to, from, next) => {
    NProgress.start()
    const token = getToken()
    if (token) {
      if (to.path === '/login') {
        next('/')
        NProgress.done()
      } else {
        const hasResources = store.getters.userInfo.resources && store.getters.userInfo.resources.length
        if (hasResources) {
          next()
        } else {
          try {
            // resources must be a object array!
            const resources = await store.dispatch('user/getUserInfo')
            // generate accessible routes map based on resources
            const accessRoutes = await store.dispatch('permission/generateRoutes', resources)
  
            // dynamically add accessible routes
            router.addRoutes(accessRoutes)
  
            // hack method to ensure that addRoutes is complete
            // set the replace: true, so the navigation will not leave a history record
            next({ ...to, replace: true })
          } catch (error) {
            console.log(error)
            await store.dispatch('user/resetToken')
            next('/login')
            NProgress.done()
          }
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
// router after each
router.afterEach(() => {
  NProgress.done()
})
