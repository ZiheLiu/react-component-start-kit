const path = require('path');

const webpack = require('webpack');

const nodeExternals = require('webpack-node-externals');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = require('./paths');

const ExtractLess = new ExtractTextPlugin({
  filename: paths.projectName + '.css'
});

module.exports = {
  entry: {
    [`${paths.projectName}`]: paths.appIndexJS,
    [`${paths.projectName}.min`]: paths.appIndexJS
  },
  output: {
    path: paths.dist,
    filename: '[name].js',
    libraryTarget: "umd",
    library: paths.projectName,
    umdNamedDefine: true
  },
  // in order to ignore built-in modules like path, fs, etc.
  target: 'node',
  // in order to ignore all modules in node_modules folder
  externals: [nodeExternals()],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [require.resolve('babel-loader')],
        include: paths.appSrc
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              compilerOptions: {
                declaration: false,
              }
            },
          }
        ],
        include: paths.appSrc,
        enforce: 'pre'
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve('tslint-loader'),
            options: {
              typeCheck: true
            }
          }
        ],
        include: paths.appSrc,
        enforce: 'pre'
      },
      {
        test: /\.less$/,
        use: ExtractLess.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'less-loader'
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
      include: /\.min\.js$/
    }),
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
    ),
    ExtractLess
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.less']
  }
};
