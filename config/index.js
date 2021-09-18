'use strict'
// Template version: 1.2.6
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const projectName = 'invoiceServer' // 项目名称

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/' + projectName + '/',
    proxyTable: {
      '/invoiceServer': {
        // target: 'http://218.17.23.118:8082', // dev
        target: 'http://10.10.205.52:8822', // 248 es. for dev
        secure: false,  // https接口配置
        changeOrigin: true, // 是否跨域，true -跨域； false -不跨域
        pathRewrite: {
          '^/invoiceServer': '/invoiceServer' // 重写接口地址，正式开发环境
        }
      },
      '/jportal': {
        target: 'http://t.jslife.net', // 248 es. for dev
        secure: false,  // https接口配置
        changeOrigin: true, // 是否跨域，true -跨域； false -不跨域
        pathRewrite: {
          '^/jportal': '/jportal' // 重写接口地址，正式开发环境
        }
      },
    },

    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 9000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: false,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: '#cheap-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/' + projectName + '/index.html'),
    loading: path.resolve(__dirname, '../dist/' + projectName + '/loading.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist/' + projectName),
    assetsSubDirectory: 'static',

    /**
     * You can set by youself according to actual condition
     * You will need to set this if you plan to deploy your site under a sub path,
     * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then assetsPublicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     */
    // assetsPublicPath: '/' + projectName + '/', // If you are deployed on the root path, please use '/'
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}