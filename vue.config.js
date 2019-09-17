const path = require('path')
const pkg = require('./package.json')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '/e-admin/',
  outputDir: 'docs',
  devServer: {
    port: 9000,
    overlay: {
      warnings: true,
      errors: true
    },
    // proxy: {
    //   // change xxx-api/login => mock/login
    //   // detail: https://cli.vuejs.org/config/#devserver-proxy
    // }
  }
}