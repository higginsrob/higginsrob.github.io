const webpack = require('webpack');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const src = path.resolve(__dirname, 'src');
const build = path.resolve(__dirname, 'build');
const isProduction = process.argv.indexOf('-p') > -1;

module.exports = {
    entry: {
        main: [
            'babel-polyfill',
            path.join(src, 'main')
        ],
        'react-redux': [
            'react',
            'react-dom',
            'react-router',
            'react-router-dom',
            'redux',
            'react-redux',
            'redux-thunk'
        ]
    },
    output: {
        path: build,
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: src,
                use: [
                    'babel-loader',
                    'eslint-loader'
                ]
            }
        ]
    },
    resolve: {
        modules: [
            'node_modules',
            src
        ],
        extensions: ['.js', '.jsx'],
    },
    devtool: !isProduction && 'source-map',
    context: __dirname,
    target: 'web',
    stats: {
        colors: false,
        chunks: false,
        modules: false,
        children: false
    },
    devServer: {
        host: process.env.NODE_HOST,
        port: process.env.NODE_PORT,
        contentBase: build,
        historyApiFallback: {
            index: '/404.html'
        },
        inline: true,
        stats: {
            colors: true,
            chunks: false,
            modules: false,
            children: false
        }
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: path.join(src, 'static'),
            to: path.join(build)
        }]),
        new webpack.ProvidePlugin({React: 'react'}),
        new CommonsChunkPlugin('react-redux'),
        new HtmlWebpackPlugin({
            template: path.join(src, 'html', 'template.html'),
            filename: 'index.html',
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            template: path.join(src, 'html', 'template.html'),
            filename: '404.html',
            inject: 'head'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: isProduction,
            debug: !isProduction
        })
    ]
};

