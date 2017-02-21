const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const WebpackConfig = require('./webpack.config');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(webpackDevMiddleware(webpack(WebpackConfig), {
    publicPath: '/build/',
    stats: {
        colors: true
    }
}));

app.get('/basic/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'basic/index.html'));
});

app.use(express.static(path.join(__dirname, '/build')));

app.listen(8080, function () {
    console.log('Server listening on http://localhost:8080.');
})
