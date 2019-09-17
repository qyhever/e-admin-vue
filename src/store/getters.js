const getters = {
  collapsed: state => state.app.collapsed,
  loading: state => state.app.loading,
  userInfo: state => state.user.info,
  roles: state => state.user.roles
}
export default getters
