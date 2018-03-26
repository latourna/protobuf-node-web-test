const bodyParser = require('body-parser')
const express = require('express')
const methodOverride = require('method-override')
const path = require('path')

const api = require('./api')

const isProduction = process.env.NODE_ENV === 'production'
const app = express()

app.use(bodyParser.json())
app.use(methodOverride())

if (isProduction) {
  app.get('*.js', (req, res, next) => {
    const acceptEncoding = req.headers['accept-encoding']
    if (acceptEncoding && acceptEncoding.includes('gzip')) {
      req.url += '.gz'
      res.set('Content-Encoding', 'gzip')
    }
    next()
  })

  app.use(express.static('./dist'))

} else {
  /* eslint-disable global-require, import/no-extraneous-dependencies,
  node/no-unpublished-require */
  const config = require('../webpack.config.js')
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  /* eslint-enable global-require, import/no-extraneous-dependencies, node/no-unpublished-require */

  const compiler = webpack(config)

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }))
  app.use(webpackHotMiddleware(compiler))
}

app.use('/api/v1', api)

app.use('/', (req, res) => {
  res.sendFile(path.resolve('client/index.html'))
})

const port = 3000

app.listen(port, (error) => {
  if (error) {
    throw error
  }
  console.log('Express server listening on port', port)
})
