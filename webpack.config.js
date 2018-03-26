const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

let entry = [
  'babel-polyfill',
  './client/client.js',
]

let plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new ExtractTextPlugin('[name].css'),
]

let jsLoaderPresets = [
  'react',
  'stage-3',
  'env',
]

if (isProduction) {
  plugins = plugins.concat([
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ])
} else {
  entry = entry.concat([
    'webpack-hot-middleware/client',
  ])

  plugins = plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
  ])

  jsLoaderPresets = jsLoaderPresets.concat([
    'react-hmre',
  ])
}

module.exports = {
  context: __dirname,
  devtool: 'inline-source-map',
  entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  mode: isProduction ? 'production' : 'development',
  plugins,
  module: {
    rules: [
      // JS
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: jsLoaderPresets,
          plugins: ['transform-class-properties', 'transform-decorators-legacy'],
        },
      },
      // styles
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      // fonts
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        loader: 'file-loader',
      },
      // images
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
      },
      // favicon
      {
        test: /\.(ico)$/i,
        loader: 'file-loader?name=[name].[ext]',
      },
      // files
      {
        test: /\.(pdf)$/i,
        loader: 'file-loader',
      },
    ],
  },
}
