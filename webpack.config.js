'use strict';
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const env = process.env.NODE_ENV;
const isDev = env !== 'production';

const cssLoaderConfig = {
    loader: 'css-loader',
    query: {
        modules: true,
        camelCase: true,
        localIdentName: isDev ? '[name]-[local]' : '[name]-[local]-[hash:base64:5]'
    }
};

const devStylesLoader = [
    'style-loader',
    cssLoaderConfig,
    'stylus-loader'
];

const prodStylesLoader = ExtractTextPlugin.extract({
    loader: [
        cssLoaderConfig,
        'stylus-loader'
    ]
});

module.exports = {
    entry: ['babel-polyfill', './app/app.js'],
    output: {
        filename: isDev ? '[name].bundle.js' : '[name]_[hash].js',
        path: path.join(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /.jsx?/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        'es2015',
                        'react'
                    ],
                    plugins: [
                        'transform-class-properties',
                        'transform-async-to-generator',
                        'transform-object-rest-spread'
                    ]
                }
            },
            {
                test: /\.styl/,
                loaders: isDev ? devStylesLoader : prodStylesLoader
            }
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json', '.jsx']
    },
    watch: isDev,
    devtool: isDev ? 'source-map' : false,
    plugins: isDev ? [] : [
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin({ filename: '[name]_[contenthash].css', allChunks: true }),
        new AssetsPlugin({ filename: 'assets.json' })
    ],
    devServer: {
        contentBase: [path.join(__dirname, 'public')],
        quiet: false,
        stats: {
            errors: true
        },
        compress: true,
        // hot: true,
        port: 9000,
        proxy: {
            '/api/*': {
                target: 'http://jsonplaceholder.typicode.com/',
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};
