const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function resolveApp(pathname) {
  return path.resolve(rootDir, pathname);
}

module.exports = {
  root: rootDir,
  appIndexJS: resolveApp('src/index.tsx'),
  appSrc: resolveApp('src'),
  dist: resolveApp('dist'),
  projectName: 'react-component-start-kit'
};
