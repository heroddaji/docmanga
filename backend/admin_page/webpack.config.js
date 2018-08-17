/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode:'development',
  entry: ['./src/index.tsx'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  // devtool: "source-map",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: ['awesome-typescript-loader'],
      },
      {
        // test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader            
          },
          "css-loader"
        ]
      },
      {
        test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        use: ['file-loader']
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  
  plugins: [new HtmlWebpackPlugin(), new webpack.NamedModulesPlugin(),
    new MiniCssExtractPlugin()],
  }
  