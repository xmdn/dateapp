// webpack.config.js
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/static/dist/',
        chunkFilename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Process JavaScript files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/, // Process CSS files
                use: [
                    'style-loader', // Injects styles into the DOM
                    'css-loader',   // Translates CSS into CommonJS
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'], // Add extensions for resolve
    },
    devtool: 'source-map', // Optional: helps with debugging
    devServer: {
        contentBase: path.join(__dirname, 'dist'), // Serve files from dist directory
        compress: true,
        port: 9000, // You can specify the port you want
        historyApiFallback: true, // For SPA support
    },
};
