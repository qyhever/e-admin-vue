import { setToken, removeToken, setUser, removeUser } from '@/utils/local'
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
      removeUser() // removeUser local
      removeToken() // removeToken local
      resetRouter()
      resolve()
    })
  },
  initUser({ commit, dispatch }, { token, userInfo }) {
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
        router.addRoutes(routes)

        commit('SET_INFO', userInfo)
        setUser(userInfo) // setUser local
        token && setToken(token) // setToken local

        resolve(redirectPath)
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
