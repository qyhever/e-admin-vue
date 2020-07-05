import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layouts'

Vue.use(Router)
// 世界上只有一种真正的英雄主义，那就是在认清生活的真相后依然热爱生活。

// 静态路由
export const constantRoutes = [
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
    component: Layout,
    children: [
      {
        name: 'exception404',
        path: '',
        meta: {
          title: '404'
        },
        component: () => import('@/views/exception/exception404')
      }
    ]
  }
]
// 动态鉴权路由
export const asyncRoutes = [
  {
    path: '/dashboard',
    component: Layout,
    meta: {
      title: '仪表盘'
    },
    children: [
      {
        name: 'dashboard',
        path: '',
        component: () => import('@/views/dashboard'),
        meta: {
          title: '仪表盘',
          icon: 'dashboard'
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
      },
      {
        name: 'uploadImage',
        path: 'upload-image',
        component: () => import('@/views/base/upload-image'),
        meta: {
          title: '上传图片',
          auth: ['uploadImage']
        }
      }
    ]
  },
  {
    path: '/user',
    redirect: '/user/index',
    component: Layout,
    meta: {
      title: '账号管理',
      auth: ['user']
    },
    children: [
      {
        name: 'user',
        path: 'index',
        component: () => import('@/views/user'),
        meta: {
          title: '账号管理',
          bread: '账号列表',
          icon: 'user'
        }
      }
    ]
  },
  {
    path: '/role',
    redirect: '/role/index',
    component: Layout,
    meta: {
      title: '角色管理',
      auth: ['role']
    },
    children: [
      {
        name: 'role',
        path: 'index',
        component: () => import('@/views/role'),
        meta: {
          title: '角色管理',
          bread: '角色列表',
          icon: 'role'
        }
      }
    ]
  },
  {
    path: '/resource',
    redirect: '/resource/index',
    component: Layout,
    meta: {
      title: '权限管理',
      auth: ['resource']
    },
    children: [
      {
        name: 'resource',
        path: 'index',
        component: () => import('@/views/resource'),
        meta: {
          title: '权限管理',
          bread: '权限列表',
          icon: 'resource'
        }
      }
    ]
  },
  {
    path: '/admin',
    redirect: '/admin/index',
    component: Layout,
    meta: {
      title: 'admin管理',
      auth: ['adminPage']
    },
    children: [
      {
        name: 'admin',
        path: 'index',
        meta: {
          title: 'admin页面',
          icon: 'admin'
        },
        component: () => import('@/views/permission/admin')
      }
    ]
  },
  {
    path: '/dev',
    redirect: '/dev/index',
    component: Layout,
    meta: {
      title: 'dev管理',
      auth: ['devPage']
    },
    children: [
      {
        name: 'dev',
        path: 'index',
        meta: {
          title: 'dev页面',
          icon: 'dev'
        },
        component: () => import('@/views/permission/dev')
      }
    ]
  },
  {
    path: '/guest',
    redirect: '/guest/index',
    component: Layout,
    meta: {
      title: 'guest管理',
      auth: ['guestPage']
    },
    children: [
      {
        name: 'guest',
        path: 'index',
        meta: {
          title: 'guest页面',
          icon: 'guest'
        },
        component: () => import('@/views/permission/guest')
      }
    ]
  },
  {
    path: '/test',
    redirect: '/test/index',
    component: Layout,
    meta: {
      title: 'test管理',
      auth: ['testPage']
    },
    children: [
      {
        name: 'test',
        path: 'index',
        meta: {
          title: 'test页面',
          icon: 'test'
        },
        component: () => import('@/views/permission/test')
      }
    ]
  },
  {
    path: '/operation',
    redirect: '/operation/index',
    component: Layout,
    meta: {
      title: 'operation管理',
      auth: ['operationPage']
    },
    children: [
      {
        name: 'operation',
        path: 'index',
        meta: {
          title: 'operation页面',
          icon: 'operation'
        },
        component: () => import('@/views/permission/operation')
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
console.log('process.env.IS_HISTORY', process.env.IS_HISTORY)
// 生成路由实例
const createRouter = () => new Router({
  mode: process.env.IS_HISTORY ? 'history' : 'hash',
  base: process.env.IS_HISTORY ? '/e-admin-vue/' : '/',
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
