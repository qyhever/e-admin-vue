import { getUser, setToken, removeToken, setUser, removeUser } from '@/utils/local'
import router, { resetRouter, asyncRoutes } from '@/router'
import { filterAsyncRoutes } from './permission'
function generateRoutes(resources) {
  const resourceCodes = resources.map(item => item.code)
  let accessedRoutes = []
  try {
    accessedRoutes = filterAsyncRoutes(asyncRoutes, resourceCodes)
  } catch (err) {
    console.log(err)
  }
  return accessedRoutes
}

function generateBreadByRoutes(routes) {
  const result = {}
  function pathMapToTitle(list, parentPath) {
    list.forEach(item => {
      if (!result[item.path]) {
        if (item.meta && item.path) {
          if (parentPath && !item.path.startsWith('/')) { // 非绝对路径拼接处理
            result[parentPath + '/' + item.path] = item.meta.bread || item.meta.title
          } else { // 绝对路径直接取 path
            result[item.path] = item.meta.bread || item.meta.title
          }
        }
        if (Array.isArray(item.children)) {
          pathMapToTitle(item.children, item.path)
        }
      }
    })
  }
  pathMapToTitle(routes)
  return result
}

const state = {
  info: {}
}

const mutations = {
  SET_INFO(state, data) {
    state.info = data
  }
}

const actions = {
  clearInfo({ commit }) {
    return new Promise(resolve => {
      commit('SET_INFO', {})
      commit('permission/SET_BREAD', {}, {root: true})
      commit('permission/SET_ROUTES', [], {root: true})
      removeUser() // removeUser local
      removeToken() // removeToken local
      resetRouter()
      resolve()
    })
  },
  initUser({ commit, dispatch }, data) {
    // 处理页面刷新
    if (!data) {
      const user = getUser()
      if (user) {
        data = user
      } else {
        return dispatch('clearInfo')
      }
    }
    // 处理用户主动登录
    const { token, userInfo } = data
    return new Promise((resolve, reject) => {
      // generate accessible routes map based on resources
      const { resources } = userInfo
      const accessRoutes = generateRoutes(resources)
      if (accessRoutes.length) {
        const redirectPath = accessRoutes[0].path === '/' ? '/dashboard' : accessRoutes[0].path
        const routes = [{
          path: '/',
          redirect: redirectPath,
          hidden: true
        }, ...accessRoutes]
        commit('permission/SET_ROUTES', routes, {root: true})
        const bread = generateBreadByRoutes(routes)
        commit('permission/SET_BREAD', bread, {root: true})
        router.addRoutes(routes)

        commit('SET_INFO', userInfo)
        setUser(data) // setUser local
        token && setToken(token) // setToken local

        resolve(redirectPath)
      } else {
        dispatch('clearInfo')
        reject(new Error('no accessRoutes'))
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
