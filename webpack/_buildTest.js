const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./_base.js')
const cwd = process.cwd()

const publicPath = '/'

const config = {
  plugins:[
  	new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
  ]
}
module.exports = merge(base, config)
