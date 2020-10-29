const path = require('path')
const dayjs = require('dayjs')
// const isDev = process.env.NODE_ENV === 'development'
const now = dayjs().format('YYYY-MM-DD HH:mm:ss')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const PROT = process.env.PROT || 9020
module.exports = {
  publicPath: '/e-admin-vue/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    port: PROT,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      '/server/mock': {
        target: 'http://localhost:' + PROT,
        changeOrigin: true,
        pathRewrite: {
          '^/server/mock': '/'
        }
      },
      '/server': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/server': '/'
        }
      }
    }
  },
  pluginOptions: {
    // import global scss variables and mixins
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [resolve('./src/assets/styles/var.scss')]
    }
  },
  chainWebpack(config) {
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()


    config.plugin('define').tap((args) => {
      // DefinePlugin 设置值 必须 JSON 序列化 或者 使用 双引号 包起来
      args[0]['process.env'].NOW = JSON.stringify(now)
      return args
    })
  }
}
