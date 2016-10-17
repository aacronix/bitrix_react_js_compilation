var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'resources');
var APP_DIR = path.resolve(__dirname, 'src');
var SOURCE_DIR = path.resolve(__dirname, 'components');

var config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loader : 'babel'
            },
            {
                test : /\.jsx?/,
                include : SOURCE_DIR,
                loader : 'babel'
            }
        ]
    }
};

module.exports = config;