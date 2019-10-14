import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.auth to determine if the current user has permission
 * @param resourceCodes
 * @param route
 */
function hasPermission(resourceCodes, route) {
  if (route.meta && route.meta.auth) {
    return resourceCodes.some(resourceCode => route.meta.auth.includes(resourceCode))
  }
  return true
}

/**
 * Filter asynchronous routing tables by resourceCodes
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, resourceCodes) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(resourceCodes, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, resourceCodes)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, accessedRoutes) => {
    state.addRoutes = accessedRoutes
    state.routes = constantRoutes.concat(accessedRoutes)
  }
}

const actions = {
  generateRoutes({ commit, rootState }) {
    const { roleNames, resources } = rootState.user.info
    const resourceCodes = resources.map(item => item.code)
    return new Promise(resolve => {
      let accessedRoutes = []
      if (roleNames.includes('admin')) {
        accessedRoutes = asyncRoutes
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, resourceCodes)
      }
      console.log(accessedRoutes)
      // console.log(JSON.stringify(accessedRoutes, null, 2))
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
