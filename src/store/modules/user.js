import { getUser, setToken, removeToken, setUser, removeUser } from '@/utils/local'
import router, { resetRouter, constantRoutes } from '@/router'
import { generateRoutes, generateBreadByRoutes } from '@/utils/permission'

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
  info: {},
  routes: [],
  accessRoutes: [],
  bread: {}
}

const mutations = {
  SET_INFO(state, data) {
    state.info = data
  },
  SET_ROUTES(state, accessedRoutes) {
    state.addRoutes = accessedRoutes
    state.routes = constantRoutes.concat(accessedRoutes)
  },
  SET_BREAD(state, routes) {
    state.bread = generateBreadByRoutes(routes)
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
        // commit('permission/SET_ROUTES', routes, {root: true})
        commit('SET_ROUTES', accessRoutes)
        router.addRoutes(accessRoutes)
        commit('SET_BREAD', accessRoutes)

        commit('SET_INFO', userInfo)
        setUser(data) // setUser local
        token && setToken(token) // setToken local

        resolve()
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
