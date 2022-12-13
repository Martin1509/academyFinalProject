const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  output: {
    path: path.resolve(process.cwd(), 'dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [
      new TsConfigPathsPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts[x]?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimizer: []
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.template.ejs',
      inject: 'body',
      publicPath: '/'
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      exclude: [/\.map$/, 'index.html'],
      cleanupOutdatedCaches: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 10000000
    })
  ]
};
