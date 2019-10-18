const baseURL = {
  dev: '//localhost:4399/',
  prod: '//qyhever.com:4399/'
}[process.env.VUE_APP_MODE]

export default baseURL
