const HtmlWebpackPlugin = require('html-webpack-plugin');
const {ModuleFederationPlugin} = require('webpack').container;
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        publicPath: 'auto',
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 3002,
        hot: true,
        open: true,
    },
    module: {
        rules: [{ test: /\.jsx?$/, loader: 'babel-loader', options: { presets: ['@babel/preset-react'] }, exclude: /node_modules/ }],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'mfe2',
            filename: 'remoteEntry.js',
            exposes: {
                './App': './src/App.jsx',
                './Product': './src/Product.jsx',
            },
            shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
        }),
        new HtmlWebpackPlugin({ template: './public/index.html' })
    ],
};