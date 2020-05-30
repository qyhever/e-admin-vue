const getters = {
  collapse: state => state.app.collapse,
  loading: state => state.app.loading,
  userInfo: state => state.user.info,
  routes: state => state.user.routes,
  bread: state => state.user.bread
}
export default getters
