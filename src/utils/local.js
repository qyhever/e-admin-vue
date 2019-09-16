const TOKEN = 'e-admin-token'
const COLLAPSED = 'e-admin-collapsed'

export const setToken = token => {
  return localStorage.setItem(TOKEN, token)
}

export const getToken = () => {
  return localStorage.getItem(TOKEN)
}

export const removeToken = () => {
  return localStorage.removeItem(TOKEN)
}

export const setCollapsed = value => {
  return localStorage.setItem(COLLAPSED, value)
}

export const getCollapsed = () => {
  return localStorage.getItem(COLLAPSED)
}
