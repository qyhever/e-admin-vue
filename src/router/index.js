import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

// 静态路由
export const constantRoutes = [
  {
    path: '/',
    redirect: '/dashboard',
    meta: {
      hidden: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    meta: {
      title: '登录',
      hidden: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/exception/exception404'),
    meta: {
      title: '404',
      hidden: true
    }
  },
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
          icon: 'el-icon-s-home'
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
          icon: 'el-icon-s-home'
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
          icon: 'el-icon-s-home'
        }
      }
    ]
  },
  {
    path: '/route',
    component: Layout,
    children: [
      {
        name: 'route',
        path: 'index',
        component: () => import('@/views/route'),
        meta: {
          title: '路由管理',
          icon: 'el-icon-s-home'
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
          icon: 'el-icon-s-home'
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
          icon: 'el-icon-s-home'
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
          icon: 'el-icon-s-home'
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
          icon: 'el-icon-s-home'
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
          icon: 'el-icon-s-home'
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
