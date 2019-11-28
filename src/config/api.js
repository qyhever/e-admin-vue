const baseURL = {
  // dev: '//localhost:4399/',
  dev: '//qyhever.com/e-admin',
  prod: '//qyhever.com/e-admin'
}[process.env.VUE_APP_MODE]

export default baseURL
