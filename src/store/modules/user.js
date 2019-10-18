import { login, getInfo } from '@/api/user'
import { setToken, removeToken } from '@/utils/local'
import { resetRouter } from '@/router'
import md5 from 'md5'

const state = {
  info: {}
}

const mutations = {
  SET_INFO(state, data) {
    state.info = data
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
          resolve(data)
        } else {
          reject(response)
        }
      }).catch(reject)
    })
  },
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        if (response.success) {
          const data = response.data
          commit('SET_INFO', data)
          resolve(data.resources)
        }
      }).catch(reject)
    })
  },
  logout({ commit }) {
    return new Promise(resolve => {
      commit('SET_INFO', {})
      removeToken()
      resetRouter()
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
