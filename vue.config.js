const path = require('path')
const fs = require('fs')
const dayjs = require('dayjs')
const isDev = process.env.NODE_ENV === 'development'
const now = dayjs().format('YYYY-MM-DD HH:mm:ss')

function resolve(dir) {
  return path.join(__dirname, dir)
}

class MetaInfoPlugin {
  constructor(options) {
    this.options = { filename: 'meta.json', ...options }
  }

  apply(compiler) {
    compiler.hooks.done.tap(this.constructor.name, stats => {
      const metaInfo = {
        // add any other information if necessary
        hash: stats.hash,
        lastDeployTime: now
      }
      const json = JSON.stringify(metaInfo, null, 2)
      return new Promise((resolve, reject) => {
        fs.writeFile(this.options.filename, json, 'utf8', error => {
          if (error) {
            reject(error)
            return
          }
          resolve()
        })
      })
    })
  }
}

const publicPath = '/e-admin-vue/'
const PROT = process.env.PROT || 9020
const cdn = {
  dev: {
    css: [],
    js: [
      publicPath + 'echarts/echarts.js'
    ]
  },
  build: {
    css: [],
    js: [
      publicPath + 'echarts/echarts.min.js'
    ]
  }
}
module.exports = {
  publicPath,
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
  configureWebpack() {
    return {
      plugins: [
        new MetaInfoPlugin({ filename: 'dist/meta.json' })
      ]
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

    config.plugin('html').tap(args => {
      args[0].cdn = isDev ? cdn.dev : cdn.build
      return args
    })

    config.plugin('define').tap((args) => {
      // DefinePlugin 设置值 必须 JSON 序列化 或者 使用 双引号 包起来
      // args[0]['process.env'].NOW = JSON.stringify(now)
      return args
    })

    if (!isDev) {
      config
        .optimization.splitChunks({
          chunks: 'all',
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial' // only package third parties that are initially dependent
            },
            elementUI: {
              name: 'chunk-ui', // split elementUI into a single package
              priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
              test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
            },
            commons: {
              name: 'chunk-commons',
              test: resolve('src/components'), // can customize your rules
              minChunks: 3, //  minimum common number
              priority: 5,
              reuseExistingChunk: true
            }
          }
        })
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk('single')
    }
  }
}
