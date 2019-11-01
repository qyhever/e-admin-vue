import { constantRoutes } from '@/router'

/**
 * Use meta.auth to determine if the current user has permission
 * @param resourceCodes
 * @param route
 */
function hasPermission(resourceCodes, route) {
  if (route.meta && route.meta.auth && Array.isArray(route.meta.auth)) {
    // return resourceCodes.some(resourceCode => route.meta.auth.includes(resourceCode))
    return route.meta.auth.every(code => resourceCodes.includes(code))
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
        if (tmp.children.length) {
          res.push(tmp)
        }
      } else {
        res.push(tmp)
      }
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

export default {
  namespaced: true,
  state,
  mutations
}
