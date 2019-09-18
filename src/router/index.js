import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

// 静态路由
export const constantRoutes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    meta: {
      title: '登录',
      hide: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/exception/exception404'),
    meta: {
      title: '404',
      hide: true
    }
  },
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        name: 'dashboard',
        path: '',
        component: () => import('@/views/dashboard')
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    children: [
      {
        name: 'admin',
        path: '',
        component: () => import('@/views/permission/admin')
      }
    ]
  },
  {
    path: '/dev',
    component: Layout,
    children: [
      {
        name: 'dev',
        path: '',
        component: () => import('@/views/permission/dev')
      }
    ]
  },
  {
    path: '/guest',
    component: Layout,
    children: [
      {
        name: 'guest',
        path: '',
        component: () => import('@/views/permission/guest')
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    children: [
      {
        name: 'test',
        path: '',
        component: () => import('@/views/permission/test')
      }
    ]
  },
  {
    path: '/operation',
    component: Layout,
    children: [
      {
        name: 'operation',
        path: '',
        component: () => import('@/views/permission/operation')
      }
    ]
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

export default router
