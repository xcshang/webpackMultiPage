const path = require('path');
const cwd = process.cwd()
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const jquery = require('jquery') 
const map = require('../map')


const entrys = {
    "vendor":["babel-polyfill",'jquery']//公用的JS文件,babel-polyfill:用于es6的Ie兼容
  },
  plugins = []

for (chunk in map) {
  entrys[chunk] = map[chunk].src
  plugins.push(new HtmlWebpackPlugin({
    alwaysWriteToDisk: true,
    filename: map[chunk].tpl,//生成的html文件
    template: path.join(cwd,'src/pages/',map[chunk].tpl), //模板文件
    chunks: ["vendor","manifest",chunk]
  }))
}

plugins.push(
    new ExtractTextPlugin("css/[name]-[contenthash:8].css"), //因为css是从js里抽出来的，所以每次有JS的修改也会导致chunkhash的变化,这里可以使用contenthash就可以了，以文件内容为hash
    new OptimizeCSSPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
         names: ['vendor', 'manifest']
    }),
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
    /*,
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })*/
)

module.exports = {
    entry:entrys, //入口文件
    output: {
        path: path.join(cwd, 'build'), // 指定打包之后的文件夹
　　　　publicPath: '/',
        filename: 'js/[name]-[chunkhash:8].js' // 可以打包为多个文件
    },

    resolve: {    
      extensions: ['.js' , '.css', '.scss'],
      modules: [path.join(cwd, 'src'), 'node_modules'],
      alias: {
        img: path.resolve(cwd, 'src/img'),
        css: path.resolve(cwd, 'src/css'),
        js: path.resolve(cwd, 'src/js')
      }
  },

     devServer: {
        //contentBase: "./", // 这个设了也不管用，不知道原因
        port:'8080',
        historyApiFallback: true, // 不跳转，不知道有什么用
        //hot:true,
        inline: true // 实时刷新
    },
    // 使用loader模块
    module: {

        rules: [
            {
              test: /\.js$/,
              loader: 'babel-loader', //此处不能用use，不知道为啥
              exclude: /node_modules/ //需要排除的目录
            },
            {
              test: /\.(css|scss)$/,
              use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            })
            },
            {
              test: /\.html$/,
  　　　　　　loader: 'html-withimg-loader'
            },
            {
              test: /\.(jpeg|jpg|png|gif)$/,
              use: {
                loader: 'url-loader',
                options: {
                  limit: 1024,
                  name: 'images/[path][name]-[hash:8].[ext]'//这里不需要用chunkhash,这里用的是url-loader的hash,不是入口的hash
                }
              }
            },
            {
              test: /\.(ttf|woff|woff|eot|svg)$/,
              use: {
                loader: 'url-loader',
                options: {
                  limit: 10240,
                  name: 'font/[name]-[hash:8].[ext]',
                  context: path.resolve(cwd, 'src/assets/font')                    
                }
              }
            }
         ]   
    },
    plugins: plugins
}