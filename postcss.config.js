const isProduction = process.env.NODE_ENV === 'production'

let plugins = []

if (isProduction) {
  /* eslint-disable global-require, import/no-extraneous-dependencies */
  const autoprefixer = require('autoprefixer')
  /* eslint-enable global-require, import/no-extraneous-dependencies */

  plugins = plugins.concat([autoprefixer])
}

module.exports = {
  plugins,
}
