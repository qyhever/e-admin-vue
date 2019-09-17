import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
// proress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// get token from localStorage
import { getToken } from '@/utils/local'
// components
import Login from '@/views/login'
import Exception404 from '@/views/exception/exception404'

Vue.use(Router)
NProgress.configure({ showSpinner: false })

const whiteList = [ '/login' ]

// 静态路由
export const constantRoutes = [
  {
    path: '/',
    redirect: '/dashboard',
    meta: {
      hide: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      hide: true
    }
  },
  {
    path: '/404',
    component: Exception404,
    meta: {
      title: '404',
      hide: true
    }
  }
]

// 生成路由实例
const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

 // reset router
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
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
          next({ ...to, replace: true })
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

export default router
