import { getToken, setToken, removeToken, getUser, setUser, removeUser } from '@/utils/local'

const state = {
  currentUser: {}
}

const mutations = {
  SET_USER(state, data) {
    state.currentUser = data || {}
  }
}

const actions = {
  logout({ commit }) {
    return new Promise(resolve => {
      commit('SET_USER', {})
      removeUser() // removeUser local
      removeToken() // removeToken local
      resolve()
    })
  },
  initUser({ commit, dispatch }, data) {
    let result = data
    // 处理页面刷新
    if (!data) {
      const localUser = getUser() // getUser local
      const localToken = getToken() // getToken local
      if (localUser && localToken && localUser.resources && localUser.resourceCodes) {
        result = {
          userInfo: localUser,
          token: localToken
        }
      } else {
        return dispatch('logout')
      }
    }
    // 处理用户主动登录
    const { token, userInfo } = result
    return new Promise((resolve, reject) => {
      if (userInfo.resources.length) {
        commit('SET_USER', userInfo)
        setToken(token) // setToken local
        setUser(userInfo) // setUser local
        resolve()
      } else {
        dispatch('logout')
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
