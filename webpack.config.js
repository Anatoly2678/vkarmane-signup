module.exports = {
    entry: {
        signin: './src/signin.js',
        signup: './src/signup.js'
    },
    output: {
        path: './built/assets',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
}