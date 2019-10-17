import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)
// 世界上只有一种真正的英雄主义，那就是在认清生活的真相后依然热爱生活。

// 静态路由
export const constantRoutes = [
  {
    path: '/',
    redirect: '/dashboard',
    hidden: true
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/404',
    hidden: true,
    component: () => import('@/views/exception/exception404'),
    meta: {
      title: '404'
    }
  }
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        name: 'dashboard',
        path: '/dashboard',
        component: () => import('@/views/dashboard'),
        meta: {
          title: '仪表盘',
          icon: 'dashboard',
          auth: ['root']
        }
      }
    ]
  },
  {
    path: '/components',
    redirect: '/components/clipboard',
    component: Layout,
    meta: {
      title: '组件',
      icon: 'component',
      auth: ['component']
    },
    children: [
      {
        name: 'clipboard',
        path: 'clipboard',
        component: () => import('@/views/base/clipboard'),
        meta: {
          title: '复制',
          auth: ['clipboard']
        }
      },
      {
        name: 'qrcode',
        path: 'qrcode',
        component: () => import('@/views/base/qrcode'),
        meta: {
          title: '二维码',
          auth: ['qrcode']
        }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        name: 'user',
        path: 'index',
        component: () => import('@/views/user'),
        meta: {
          title: '账号管理',
          icon: 'user',
          auth: ['user']
        }
      }
    ]
  },
  {
    path: '/role',
    component: Layout,
    children: [
      {
        name: 'role',
        path: 'index',
        component: () => import('@/views/role'),
        meta: {
          title: '角色管理',
          icon: 'role',
          auth: ['role']
        }
      }
    ]
  },
  {
    path: '/resource',
    component: Layout,
    children: [
      {
        name: 'resource',
        path: 'index',
        component: () => import('@/views/resource'),
        meta: {
          title: '权限管理',
          icon: 'resource',
          auth: ['resource']
        }
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    children: [
      {
        name: 'admin',
        path: 'index',
        meta: {
          title: 'admin页面',
          icon: 'admin',
          auth: ['adminPage']
        },
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
        path: 'index',
        meta: {
          title: 'dev页面',
          icon: 'dev',
          auth: ['devPage']
        },
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
        path: 'index',
        meta: {
          title: 'guest页面',
          icon: 'guest',
          auth: ['guestPage']
        },
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
        path: 'index',
        meta: {
          title: 'test页面',
          icon: 'test',
          auth: ['testPage']
        },
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
        path: 'index',
        meta: {
          title: 'operation页面',
          icon: 'operation',
          auth: ['operationPage']
        },
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
