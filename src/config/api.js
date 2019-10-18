const baseURL = {
  dev: '//localhost:4399/',
  prod: '//qyhever.com/e-admin'
}[process.env.VUE_APP_MODE]

export default baseURL
