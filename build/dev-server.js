'use strict'
require('./check-versions')()

const config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

const app = express()

//数据请求
var homeData = require('../data/home.json')

var classifyData = require('../data/classify.json')

var newData = require('../data/new.json')

var sellData = require('../data/sell.json')

var popData = require('../data/pop.json')

var mineData = require('../data/mine.json')

var popProData = require('../data/popularProducts.json')

var hotkey = require('../data/hotSearch.json')

var apiRouter = express.Router();

app.use('/api', apiRouter)
app.use('/api/category', apiRouter)
app.use('/api', apiRouter)
// 获取首页数据
apiRouter.get('/home', function (req, res) {
  res.json({
    error: 0,
    data: homeData
  })
})
//获取流行单品数据
apiRouter.get('/popularProducts', function (req, res) {
  res.json({
    error: 0,
    data: popProData
  })
})
// 获取分类数据
apiRouter.get('/classify', function (req, res) {
  res.json({
    error: 0,
    data: classifyData
  })
})
//获取上新数据
apiRouter.get('/new', function (req, res) {
  res.json({
    error: 0,
    data: newData
  })
})
//获取热销数据
apiRouter.get('/sell', function (req, res) {
  res.json({
    error: 0,
    data: sellData
  })
})
//获取流行数据
apiRouter.get('/pop', function (req, res) {
  res.json({
    error: 0,
    data: popData
  })
})
// 获取我的页面
apiRouter.get('/mine', function (req, res) {
  res.json({
    error: 0,
    data: mineData
  })
})
//获取热门搜索关键字
apiRouter.get('/hotkey',function (req, res) {
  res.json({
    error: 0,
    data: hotkey
  })
})
//获取商品信息
apiRouter.get('/shop/product/:id',function (req, res) {
  var id =  req.params.id
  res.json({
    error: 0,
    data: require('../data/'+ id +'.json')
  })
})
//获取热门推荐的数据
apiRouter.get('/shop/hotRecommend/:id',function (req, res) {
  var id =  req.params.id
  res.json({
    error: 0,
    data: require('../data/hotRecommend'+ id +'.json')
  })
})
//获取店铺信息
apiRouter.get('/shop/shopInfo', function (req, res) {
  res.json({
    error: 0,
    data: require('../data/shopInfo.json')
  })
})


const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
// currently disabled until this is resolved:
// https://github.com/jantimon/html-webpack-plugin/issues/680
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err)
    }
    process.env.PORT = port
    var uri = 'http://localhost:' + port
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
    server = app.listen(port)
    _resolve()
  })
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
