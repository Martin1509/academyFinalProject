const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const DotenvPlugin = require('dotenv-webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { NONAME } = require('dns');

module.exports = merge(common, {
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    client: {
      logging: 'none', // to suppress logs from print to console
      progress: true,
      overlay: {
        warnings: false,
        errors: true
      }
    },
    compress: true,
    host: '0.0.0.0',
    port: 3000,
    hot: true,
    historyApiFallback: true
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.ts[x]?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['react-refresh/babel']
            }
          }
        ]
      },
      {
        test: /\.[s]?css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, './src')]
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new DotenvPlugin({
      path: './.env.dev'
    }),
    new ReactRefreshWebpackPlugin()
  ]
});
