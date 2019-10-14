const getters = {
  collapsed: state => state.app.collapsed,
  loading: state => state.app.loading,
  userInfo: state => state.user.info,
  routes: state => state.permission.routes
}
export default getters
