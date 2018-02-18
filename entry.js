const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('./webpack.config.js');

const DEV_SERVER_PORT = webpackConfig.devServer.port;

if (process.env.NODE_ENV !== 'production') {
  new WebpackDevServer(webpack(webpackConfig), webpackConfig.devServer).listen(
    DEV_SERVER_PORT,
    err => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log('[webpack-dev-server]', err);
      }
      // eslint-disable-next-line no-console
      console.log('[webpack-dev-server]', 'Listening on port ', 9000);
    },
  );
}
require('./index');
