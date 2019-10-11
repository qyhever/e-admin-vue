import { login, getInfo } from '@/api/user'
import { setToken, removeToken } from '@/utils/local'
// import router, { resetRouter } from '@/router'
import md5 from 'md5'

const state = {
  info: {},
  roles: []
}

const mutations = {
  SET_INFO(state, data) {
    state.info = data
  },
  SET_ROLES(state, roles) {
    state.roles = roles
  }
}

const actions = {
  login(_ , userInfo) {
    const { userName, password } = userInfo
    return new Promise((resolve, reject) => {
      const params = {
        userName,
        password: md5(md5(password))
      }
      login(params).then(response => {
        if (response.success) {
          const { data } = response
          const { token } = data
          setToken(token)
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        if (response.success) {
          const data = response.data
          const roles = [ data.roleId ]
          commit('SET_ROLES', roles)
          commit('SET_INFO', data)
          resolve(roles)
        }
      }).catch(e => {
        reject(e)
      })
    })
  },
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_ROLES', [])
      commit('SET_INFO', {})
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
