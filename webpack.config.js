const path = require('path');
const webpack = require('webpack');

const env = process.env.NODE_ENV;
const isDev = env !== 'production';

module.exports = {
    entry: ['babel-polyfill', './app/app.js'],
    output: {
        filename: 'main.bundle.js',
        path: path.join(__dirname, 'public/scripts')
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
                        'transform-async-to-generator'
                    ]
                }
            },
            {
                test: /\.styl/,
                loaders: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]-[local]'
                        }
                    },
                    'stylus-loader'
                ]
            }
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: [ '.js', '.json', '.jsx']
    },
    watch: isDev,
    devtool: isDev ? 'source-map' : 'eval',
    // plugins: isDev ? [ new webpack.HotModuleReplacementPlugin() ] : [],
    devServer: {
        contentBase: [path.join(__dirname, 'public/scripts')],
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
