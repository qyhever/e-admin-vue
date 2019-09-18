const baseURL = {
  dev: '//localhost:4399/',
  prod: '//qyhever.com/'
}[process.env.VUE_APP_MODE]

export default baseURL
