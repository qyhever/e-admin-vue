const baseURL = {
  dev: '//localhost:3000/',
  prod: '//qyhever.com/'
}[process.env.VUE_APP_MODE]

export default baseURL