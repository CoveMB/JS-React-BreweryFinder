const path = require('path');
const webpack = require('webpack');

// Webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

// Location of files
const srcFolder = 'app';
const buildFolder = 'dist';

const PATHS = {
    app: path.join(__dirname, srcFolder),
    build: path.join(__dirname, buildFolder),
};

module.exports = {
    mode: 'development',

    entry: PATHS.app,

    output: {
        path: PATHS.build,
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },

    devtool: 'cheap-module-source-map',

    resolve: {
        modules: [
            srcFolder,
            'node_modules',
        ],
        extensions: [
            '.js',
            '.jsx',
        ],
    },

    target: 'web',

    performance: { hints: false },

    stats: 'errors-only',

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }, {
                test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
                use: 'file-loader',
            }, {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                        },
                    },
                ],
            }, {
                test: /\.(mp4|webm)$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                },
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(PATHS.app, 'index.ejs'),
            inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
        }),
    ],

    optimization: {
        // Automatically split vendor and commons
        splitChunks: {
            chunks: 'all',
        },
        // Keep the runtime chunk seperated to enable long term caching
        runtimeChunk: true,
    },

    // WebpackDevServer specific
    devServer: {
        host,
        port,

        // respond to 404s with index.html
        historyApiFallback: true,

        // Location of files
        contentBase: PATHS.build,

        stats: 'errors-only',
    },
};