// webpack.config.js
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        admin: './src/admin/Admin.js',
        user: './src/user/User.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, 
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Process JavaScript files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
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
    optimization: {
        splitChunks: {
            cacheGroups: {
                // Define a cache group for web vitals to bundle it separately
                webVitals: {
                    test: /[\\/]node_modules[\\/]web-vitals[\\/]/,
                    name: 'node_modules_web', // Static name for the web vitals bundle
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
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
