const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('./webpack.config.js');

const DEV_SERVER_PORT = webpackConfig.devServer.port;

if (process.env.NODE_ENV !== 'production') {
    // webpackConfig.output.publicPath = `http://localhost:${DEV_SERVER_PORT}/`;
    // webpackConfig.devServer.publicPath = webpackConfig.output.publicPath;

    new WebpackDevServer(webpack(webpackConfig), webpackConfig.devServer)
        .listen(DEV_SERVER_PORT, err => {
            if (err) {
                console.log('[webpack-dev-server]', err); // eslint-disable-line no-console
            }
            console.log('[webpack-dev-server]', 'Listening on port ', 9000); // eslint-disable-line no-console
        });
}
require('babel-register');
require('./index');
