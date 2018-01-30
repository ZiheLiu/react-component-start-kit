const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const paths = require('./paths');


module.exports = {
  entry: paths.appIndexJS,
  output: {
    path: paths.dist,
    filename: 'bundle.js'
  },
  // in order to ignore built-in modules like path, fs, etc.
  target: 'node',
  // in order to ignore all modules in node_modules folder
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [require.resolve('babel-loader')],
        include: paths.appSrc
      },
      {
        test: /\.tsx?$/,
        use: [require.resolve('ts-loader')],
        include: paths.appSrc,
        enforce: "pre"
      },
      {
        test: /\.tsx?$/,
        use: [{
          loader: require.resolve('tslint-loader'),
          options: {
            typeCheck: true
          }
        }],
        include: paths.appSrc,
        enforce: "pre"
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize:true}),
    new CleanWebpackPlugin(
      // delete /dist
      [paths.dist],
      {
        root: paths.root,
        // output in shell　　　　　　　　　
        verbose: true,
        // open option of deleting　　
        dry: false
      }
    )
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.jsx']
  }
};