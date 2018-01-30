// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
const path = require('path');

const paths = require('../config/paths');

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);

  config.module.rules.push({
    test: /\.tsx?$/,
    loader: require.resolve('ts-loader'),
    include: paths.root,
    exclude: /node_modules/,
    enforce: "pre"
  });

  config.module.rules.push({
    test: /\.tsx?$/,
    use: [{
      loader: require.resolve('tslint-loader'),
      options: {
        typeCheck: true,
        tsConfigFile: path.resolve(paths.root, 'stories', 'tsconfig.json')
      }
    }],
    include: paths.root,
    exclude: /node_modules/,
    enforce: "pre"
  });

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};