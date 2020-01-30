const path = require('path')
const nodeExternals = require('webpack-node-externals')

const serverConfig = {
  entry: './server/index.js',
  mode: 'production',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
      }
    ]
  }
}

module.exports = [ serverConfig]
