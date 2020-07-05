const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const isHistory = process.env.npm_config_history || false
console.log('process.env.npm_config_history', process.env.npm_config_history)
function resolve(dir) {
  return path.join(__dirname, dir)
}
const externals = {
  // 'vue': 'Vue'
}
const cdn = {
  dev: {
    css: [],
    js: [
      '//qiniu.qyhever.com/lib/babel-polyfill/7.6.0/polyfill.js'
    ]
  },
  build: {
    css: [],
    js: [
      'https://qiniu.qyhever.com/lib/babel-polyfill/7.6.0/polyfill.min.js'
    ]
  }
}
module.exports = {
  publicPath: '/e-admin-vue/',
  productionSourceMap: false,
  devServer: {
    port: 9000,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  pluginOptions: {
    // import global scss variables and mixins
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [resolve('./src/assets/styles/global.scss')]
    }
  },
  configureWebpack(config) {
    config.externals = externals
  },
  chainWebpack(config) {
    if (isDev) {
      config.devtool = 'cheap-source-map'
    }
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        disable: isDev
      })

    // 将 cdn 变量 插入到 html 文件中（可以通过 htmlWebpackPlugin.options.cdn 访问）
    config.plugin('html').tap(args => {
      args[0].cdn = isDev? cdn.dev : cdn.build
      return args
    })
    // set the version global variable
    config.plugin('define').tap((args) => {
      // DefinePlugin 设置值 必须 JSON 序列化 或者 使用 双引号 包起来
      // args[0]['process.env'].version = JSON.stringify(pkg.version)
      args[0]['process.env'].IS_HISTORY = JSON.stringify(!!isHistory)
      return args
    })
  }
}
