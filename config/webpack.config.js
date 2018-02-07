const path = require('path');

const webpack = require('webpack');

const nodeExternals = require('webpack-node-externals');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

// if PROD, produce [name].min.js & [name].min.css
// otherwise, produce [name].js & [name].css
const PROD = process.env.NODE_ENV === 'production';

const paths = require('./paths');

const ExtractLess = new ExtractTextPlugin({
  filename: `${paths.projectName}${PROD ? '.min.css' : '.css'}`
});


module.exports = {
  entry: {
    [paths.projectName]: [
      paths.appIndexJS,
      paths.appStyle
    ]
  },
  output: {
    path: paths.dist,
    filename: PROD ? '[name].min.js' : '[name].js',
    libraryTarget: "umd",
    library: paths.projectName,
    umdNamedDefine: true
  },
  // in order to ignore built-in modules like path, fs, etc.
  target: 'node',
  // in order to ignore all modules in node_modules folder
  externals: [nodeExternals()],
  devtool: '#source-map',
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
          },
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
                minimize: PROD,
                sourceMap: true
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  plugins: function () {
    const plugins = [ExtractLess];
    if (PROD) {
      plugins.push(
        new webpack.optimize.UglifyJsPlugin({
          minimize: true,
          sourceMap: true
        })
      )
    }
    return plugins
  }(),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.less']
  }
};
