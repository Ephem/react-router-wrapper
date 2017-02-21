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
    }
};
