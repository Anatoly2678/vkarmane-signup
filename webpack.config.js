const webpack = require('webpack')
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        signin: './src/signin.js',
        signup: './src/signup.js',
        recovery: './src/recovery.js'
    },
    output: {
        path: './built/statics',
        publicPath: '/statics/',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {'NODE_ENV': JSON.stringify('development')} // production
        }),
        new CommonsChunkPlugin("commons.bundle.js"),
        new webpack.optimize.AggressiveMergingPlugin()
    ],
}