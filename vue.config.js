const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const isHistory = process.env.npm_config_history || false

function resolve(dir) {
  return path.join(__dirname, dir)
}
const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'axios': 'axios'
}
const cdn = {
  dev: {
    css: [],
    js: [
      '//qiniu.qyhever.com/lib/vue/2.6.10/vue.js',
      '//qiniu.qyhever.com/lib/vue-router/3.1.3/vue-router.js',
      '//qiniu.qyhever.com/lib/vuex/3.1.1/vuex.js',
      '//qiniu.qyhever.com/lib/axios/0.18.0/axios.js',
      // '//qiniu.qyhever.com/lib/echarts/4.0.4/echarts.js'
      '//qiniu.qyhever.com/lib/babel-polyfill/7.6.0/polyfill.js'
    ]
  },
  build: {
    css: [],
    js: [
      '//qiniu.qyhever.com/lib/vue/2.6.10/vue.min.js',
      '//qiniu.qyhever.com/lib/vue-router/3.1.3/vue-router.min.js',
      '//qiniu.qyhever.com/lib/vuex/3.1.1/vuex.min.js',
      '//qiniu.qyhever.com/lib/axios/0.18.0/axios.min.js',
      // '//qiniu.qyhever.com/lib/echarts/4.0.4/echarts.min.js',
      '//qiniu.qyhever.com/lib/babel-polyfill/7.6.0/polyfill.min.js'
    ]
  }
}
module.exports = {
  publicPath: '/e-admin-vue/',
  devServer: {
    port: 9000,
    overlay: {
      warnings: true,
      errors: true
    }
    // proxy: {
    //   // change xxx-api/login => mock/login
    //   // detail: https://cli.vuejs.org/config/#devserver-proxy
    // }
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
  },
  productionSourceMap: false
}
