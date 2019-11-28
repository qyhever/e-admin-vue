const getters = {
  collapse: state => state.app.collapse,
  loading: state => state.app.loading,
  userInfo: state => state.user.info,
  routes: state => state.permission.routes
}
export default getters
