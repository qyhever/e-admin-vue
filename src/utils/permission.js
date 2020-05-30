import { asyncRoutes } from '@/router'
/**
 * 判断 当前路由 meta.auth 的code 是否都在 resourceCodes 中
 * @param {Array} resourceCodes 拥有的所有权限编码
 * @param {Object} route 路由对象
 * @return {Boolean}
 */
export const hasPermission = (resourceCodes, route) => {
  if (route.meta && route.meta.auth && Array.isArray(route.meta.auth)) {
    // return resourceCodes.some(resourceCode => route.meta.auth.includes(resourceCode))
    return route.meta.auth.every(code => resourceCodes.includes(code))
  }
  return true
}

/**
 * 使用 resourceCodes 过滤出 拥有权限的 路由表
 * @param {Array} routes asyncRoutes
 * @param {Array} resourceCodes 拥有的权限编码
 * @return {Array} 权限路由表
 */
export const filterAsyncRoutes = (routes, resourceCodes) => {
  const res = []
  routes.forEach(route => {
    const tmp = Object.assign({}, route)
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

// 修正相对路径
const resolvePath = (parentPath, path) => {
  if (path.indexOf('/') === 0) { // 绝对路径
    return path
  }
  return `${parentPath}/${path}`
}

/**
 * 根据 权限路由找到重定向路由path
 * @param {Array} accessRoutes 权限路由表
 * @return {String} 重定向路由path
 */
export const findAccessRedirectPath = accessRoutes => {
  return accessRoutes.find(item => !item.hidden)
}

/**
 * 生成权限路由表
 * @param {Array} resources 拥有的权限编码
 * @return {Array} 权限路由表
 */
export const generateRoutes = (resources) => {
  const resourceCodes = resources.map(item => item.code)
  let accessedRoutes = []
  try {
    accessedRoutes = filterAsyncRoutes(asyncRoutes, resourceCodes)
    // 修正父级路由 redirect
    accessedRoutes = accessedRoutes.map(item => {
      if (Array.isArray(item.children) && item.redirect) {
        const firstChildrenRoute = item.children.find(_ => !_.hidden)
        return Object.assign({}, item, {
          redirect: resolvePath(item.path, firstChildrenRoute.path)
        })
      }
      return item
    })
    if (accessedRoutes.length) {
      const redirectPath = findAccessRedirectPath(accessedRoutes)
      accessedRoutes = [{
        path: '/',
        redirect: redirectPath,
        hidden: true
      }].concat(accessedRoutes)
    }
  } catch (err) {
    console.log(err)
    accessedRoutes = []
  }
  return accessedRoutes
}

/**
 * 根据路由生成面包屑映射
 * @param {Array} routes 路由表
 * @return {Object} 面包屑（键：路径，值：路由中配置的 meta.bread || meta.title）
 */
export const generateBreadByRoutes = (routes) => {
  const result = {}
  const pathMapToTitle = (list, parentPath) => {
    list.forEach(item => {
      if (!result[item.path]) {
        if (item.meta && item.path) { // 避免有的路由没有 meta
          if (parentPath && item.path.indexOf('/') !== 0) { // 如果不是绝对路径
            result[parentPath + '/' + item.path] = item.meta.bread || item.meta.title
          } else {
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
