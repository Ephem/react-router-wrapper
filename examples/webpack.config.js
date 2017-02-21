const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {
    context: __dirname,

    entry: {
        basic: './basic/basic.js'
    },

    output: {
        path: __dirname + '/build',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/build/'
    },

    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
        ]
    },

    devtool: 'inline-source-map',

    resolve: {
        alias: {
            'react-router-wrapper': path.join(__dirname, '..', 'src')
        }
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('shared'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ]

}
