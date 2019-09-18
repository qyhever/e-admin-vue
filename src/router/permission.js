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
        const hasRoles = store.getters.roles && store.getters.roles.length
        if (hasRoles) {
          next()
        } else {
          try {
            // roles must be a object array! such as: ['1'] or ,['1','2']
            const roles = await store.dispatch('user/getUserInfo')
            console.log(roles)
            // generate accessible routes map based on roles
            // const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
  
            // dynamically add accessible routes
            // router.addRoutes(accessRoutes)
  
            // hack method to ensure that addRoutes is complete
            // set the replace: true, so the navigation will not leave a history record
            // next({ ...to, replace: true })
            next()
          } catch (error) {
            console.log(error)
            await store.dispatch('user/resetToken')
            next(`/login?redirect=${to.path}`)
            NProgress.done()
          }
        }
      }
    } else {
      if (whiteList.indexOf(to.path) >= 0) {
        next()
      } else {
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  
})
// router after each
router.afterEach(() => {
NProgress.done()
})
