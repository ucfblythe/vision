const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        alias: {
            react: path.resolve('node_modules/react'),
        },
    },
    entry: './src/Main.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'mainbd.js',
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
        inline: true,
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.js?$|\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.(pdf|jpg|png|gif|svg|ico)$/,
                use: [
                    {
                        loader: 'url-loader'
                    },
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    externals:{
        settings: JSON.stringify(require("./config/settings.json")), //eslint-disable-line
    }
};
