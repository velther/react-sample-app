'use strict';
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const DEV_SERVER_PORT = 9000;

const env = process.env.NODE_ENV;
const isDev = env !== 'production';
const cwd = process.cwd();

const cssLoaderConfig = {
  loader: 'css-loader',
  query: {
    modules: true,
    camelCase: true,
    localIdentName: isDev ? '[name]-[local]' : '[name]-[local]-[hash:base64:5]',
  },
};

const devStylesLoader = ['style-loader', cssLoaderConfig, 'stylus-loader'];

const prodStylesLoader = ExtractTextPlugin.extract({
  use: [cssLoaderConfig, 'stylus-loader'],
});

module.exports = {
  entry: isDev ?
    [
      './app/lib/polyfill.js',
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:9000',
      'webpack/hot/only-dev-server',
      './app/app.dev.js',
    ] :
    ['./app/lib/polyfill.js', './app/app.prod.js'],
  output: {
    filename: isDev ? '[name].bundle.js' : '[name]_[hash].js',
    path: path.join(__dirname, 'public'),
    publicPath: isDev ? `http://localhost:${DEV_SERVER_PORT}/` : '/',
  },
  module: {
    rules: [
      {
        test: /.jsx?/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.styl/,
        loaders: isDev ? devStylesLoader : prodStylesLoader,
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      actions: path.join(cwd, 'app/actions'),
      common: path.join(cwd, 'app/components/_common'),
      components: path.join(cwd, 'app/components'),
      constants: path.join(cwd, 'app/constants'),
      lib: path.join(cwd, 'app/lib'),
    },
  },
  watch: isDev,
  devtool: isDev ? 'source-map' : false,
  plugins: (isDev => {
    const plugins = [
      new webpack.NamedModulesPlugin(),
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks({ context }) {
          return context && context.indexOf('node_modules') !== -1;
        },
      }),
      new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
    ];

    if (process.env.ANALYZE) {
      plugins.push(new BundleAnalyzerPlugin());
    }

    if (isDev) {
      return [...plugins, new webpack.HotModuleReplacementPlugin()];
    } else {
      return [
        ...plugins,
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin({ filename: '[name]_[contenthash].css', allChunks: true }),
        new AssetsPlugin({ filename: 'assets.json' }),
      ];
    }
  })(isDev),
  devServer: {
    contentBase: [path.join(__dirname, 'public')],
    quiet: false,
    stats: {
      errors: true,
    },
    compress: true,
    hot: true,
    port: DEV_SERVER_PORT,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/api/*': {
        target: 'http://jsonplaceholder.typicode.com/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
