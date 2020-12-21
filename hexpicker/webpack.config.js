const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    // Change to your "entry-point".
    entry: './src/script.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [{
            // Include ts, tsx, js, and jsx files.
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Custom template',
          // Load a custom template (lodash by default)
          template: './src/index.html'
        })
    ]
};