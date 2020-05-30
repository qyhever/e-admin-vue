import { getUser, setToken, getToken, removeToken, setUser, removeUser } from '@/utils/local'
import router, { resetRouter, constantRoutes } from '@/router'
import { generateRoutes, generateBreadByRoutes } from '@/utils/permission'

const state = {
  info: {},
  routes: [],
  accessRoutes: [],
  bread: {}
}

const mutations = {
  SET_INFO(state, data) {
    data && setUser(data) // setUser local
    state.info = data || {}
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
      commit('SET_INFO', null)
      commit('SET_BREAD', [])
      commit('SET_ROUTES', [])
      removeUser() // removeUser local
      removeToken() // removeToken local
      resetRouter()
      resolve()
    })
  },
  initUser({ commit, dispatch }, data) {
    let result = data
    // 处理页面刷新
    if (!data) {
      const localUser = getUser() // getUser local
      const localToken = getToken() // getToken local
      if (localUser && localToken && localUser.resources) {
        result = {
          userInfo: localUser,
          token: localToken
        }
      } else {
        return dispatch('clearInfo')
      }
    }
    // 处理用户主动登录
    const { token, userInfo } = result
    return new Promise((resolve, reject) => {
      // generate accessible routes map based on resources
      const accessRoutes = generateRoutes(userInfo.resources)
      if (accessRoutes.length) {
        router.addRoutes(accessRoutes)
        commit('SET_ROUTES', accessRoutes)
        commit('SET_BREAD', accessRoutes)
        commit('SET_INFO', userInfo)
        setToken(token) // setToken local
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
