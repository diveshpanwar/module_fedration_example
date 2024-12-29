const HtmlWebpackPlugin = require('html-webpack-plugin');
const {ModuleFederationPlugin} = require('webpack').container;
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        publicPath: 'auto',
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 3001,
        hot: true,
        open: true,
    },
    module: {
        rules: [{ test: /\.jsx?$/, loader: 'babel-loader', options: { presets: ['@babel/preset-react'] }, exclude: /node_modules/ }],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'mfe1',
            remotes: {
                mfe2: 'mfe2@http://localhost:3002/remoteEntry.js',
            },
            shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
        }),
        new HtmlWebpackPlugin({ template: './public/index.html' })
    ],
};