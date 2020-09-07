export const getRandomStr = () => {
  return new Date().getTime() + Math.random().toString(16).slice(2)
}

export const getDocumentTitle = (route) => {
  if (route.meta && route.meta.title) {
    return 'e-admin - ' + route.meta.title
  }
  return 'e-admin'
}

/**
 * 将一个扁平化的数组转换为树状结构
 * @param {Array} list
 * @param {Null | String} id 子节点关联属性 值
 * @param {String} key 子节点关联属性 键
 * @param {String} parentKey 父节点关联属性 键
 * @return {Array} 树状数据
 */
export const listToTree = (list, id, key, parentKey) => {
  const ret = []
  const temp = list.filter(v => v[parentKey] === id)
  temp.forEach(item => {
    ret.push({
      ...item,
      id: String(item.id),
      children: listToTree(list, item[key], key, parentKey)
    })
  })
  return ret
}

/**
 * 判断当前路由是否拥有权限
 * @param {Object} route 当前路由对象
 * @param {Array<string>} resourceCodes 当前用户拥有的所有权限 code list
 * @return {Boolean} 是否拥有权限
 */
export const hasPermission = (route, resourceCodes = []) => {
  if (route.meta && route.meta.auth && Array.isArray(route.meta.auth)) {
    return route.meta.auth.some(code => resourceCodes.includes(code))
  }
  return true
}
/**
 * 生成有权限的路由
 * @param {Array} routes 路由表
 * @param {Array<string>} resourceCodes 当前用户拥有的所有权限 code list
 * @return {Array} accessRoutes
 */
export const getAccessRoutes = (routes, resourceCodes) => {
  return routes.filter(item => {
    if (Array.isArray(item.children)) {
      item.children = getAccessRoutes(item.children, resourceCodes)
    }
    return hasPermission(item, resourceCodes)
  })
}
