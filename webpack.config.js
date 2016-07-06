module.exports = {
    entry: './src/signup.js',
    output: {
        path: './built/assets',
        filename: 'signup.bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
}