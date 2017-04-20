'use strict';
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const DEV_SERVER_PORT = 9000;

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
    use: [
        cssLoaderConfig,
        'stylus-loader'
    ]
});

module.exports = {
    entry: isDev ?
        [
            'babel-polyfill',
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:9000',
            'webpack/hot/only-dev-server',
            './app/app.dev.js'
        ] :
        [
            'babel-polyfill',
            './app/app.prod.js'
        ],
    output: {
        filename: isDev ? '[name].bundle.js' : '[name]_[hash].js',
        path: path.join(__dirname, 'public'),
        publicPath: isDev ? `http://localhost:${DEV_SERVER_PORT}/` : '/'
    },
    module: {
        rules: [
            {
                test: /.jsx?/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        ['es2015', { modules: false }],
                        'react'
                    ],
                    plugins: ((isDev) => {
                        const plugins = [
                            'transform-class-properties',
                            'transform-async-to-generator',
                            'transform-object-rest-spread'
                        ];

                        if (isDev) {
                            plugins.push('react-hot-loader/babel');
                        }

                        return plugins;
                    })(isDev)
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
    devtool: isDev ? 'eval' : false,
    plugins: isDev ?
        [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.EnvironmentPlugin(['NODE_ENV'])
        ] :
        [
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
        hot: true,
        port: DEV_SERVER_PORT,
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
