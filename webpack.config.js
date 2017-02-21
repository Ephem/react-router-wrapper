const webpack = require('webpack');

module.exports = {
    output: {
        library: 'reactRouterWrapper',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
        ]
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-router': {
            root: 'ReactRouter',
            commonjs2: 'react-router',
            commonjs: 'react-router',
            amd: 'react-router'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ]
};
