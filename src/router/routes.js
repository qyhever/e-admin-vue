import BasicLayout from '@/layouts/basic'
import BlankLayout from '@/layouts/blank'

// function loadable(path) {
//   return () => import(/* webpackChunkName: '[request]' */`@/views/${path}`)
// }

export const basicRoutes = [
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () => import('@/views/dashboard'),
    meta: {
      title: '仪表盘',
      icon: 'dashboard'
    }
  },
  {
    path: '/components',
    redirect: '/components/clipboard',
    component: BlankLayout,
    meta: {
      title: '组件',
      icon: 'component',
      auth: ['component']
    },
    children: [
      {
        name: 'clipboard',
        path: '/components/clipboard',
        component: () => import('@/views/base/clipboard'),
        meta: {
          title: '复制',
          auth: ['clipboard']
        }
      },
      {
        name: 'qrcode',
        path: '/components/qrcode',
        component: () => import('@/views/base/qrcode'),
        meta: {
          title: '二维码',
          auth: ['qrcode']
        }
      }
    ]
  },
  {
    name: 'user',
    path: '/user',
    component: () => import('@/views/user'),
    meta: {
      title: '账号管理',
      icon: 'user',
      auth: ['user']
    }
  },
  {
    name: 'role',
    path: '/role',
    component: () => import('@/views/role'),
    meta: {
      title: '角色管理',
      icon: 'role',
      auth: ['role']
    }
  },
  {
    name: 'resource',
    path: '/resource',
    component: () => import('@/views/resource'),
    meta: {
      title: '权限管理',
      icon: 'resource',
      auth: ['resource']
    }
  },
  {
    name: 'admin',
    path: '/admin',
    meta: {
      title: 'admin页面',
      icon: 'admin',
      auth: ['adminPage']
    },
    component: () => import('@/views/permission/admin')
  },
  {
    name: 'dev',
    path: '/dev',
    meta: {
      title: 'dev页面',
      icon: 'dev',
      auth: ['devPage']
    },
    component: () => import('@/views/permission/dev')
  },
  {
    name: 'guest',
    path: '/guest',
    meta: {
      title: 'guest页面',
      icon: 'guest',
      auth: ['guestPage']
    },
    component: () => import('@/views/permission/guest')
  },
  {
    name: 'test',
    path: '/test',
    meta: {
      title: 'test页面',
      icon: 'test',
      auth: ['testPage']
    },
    component: () => import('@/views/permission/test')
  },
  {
    name: 'operation',
    path: '/operation',
    meta: {
      title: 'operation页面',
      icon: 'operation',
      auth: ['operationPage']
    },
    component: () => import('@/views/permission/operation')
  }
]

export const blankRoutes = [
  {
    path: '/analysis',
    component: () => import('@/views/analysis'),
    meta: {
      title: '分析页',
      icon: 'analysis'
    }
  }
]

export const routes = [...basicRoutes, ...blankRoutes]

export default [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/views/login'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    redirect: '/dashboard',
    hidden: true
  },
  {
    path: '/',
    hidden: true,
    component: BasicLayout,
    children: basicRoutes
  },
  ...blankRoutes,
  {
    name: 'forbidden',
    path: '/forbidden',
    hidden: true,
    meta: {
      title: 'forbidden'
    },
    component: () => import('@/views/exception/forbidden')
  },
  {
    name: 'notfound',
    path: '/notfound',
    hidden: true,
    meta: {
      title: 'notfound'
    },
    component: () => import('@/views/exception/notfound')
  },
  {
    path: '*',
    redirect: '/notfound',
    hidden: true
  }
]
