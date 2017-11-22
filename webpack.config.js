const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
const PATHS = {
        app: path.join(__dirname, './source'),
        build: path.join(__dirname, './dist')
    };

// This function takes a string with the file name as the first parameter,
// and the second parameter is a string with the name of the source in the directory,
// finds all files with the name equal to the first parameter,
// and forms the object in which the key is equal to the path relative to the source in the directory
// and the value is equal to the absolute path to the search file

function entryObject(item) {
    const paths = glob.sync(`${PATHS.app}/js/**/${item}`);

    return function () {
        const ret = {};

        paths.forEach(function(path) {
            const pathArr = path.split('/');
            ret[pathArr.slice(pathArr.indexOf('js') - pathArr.length + 1).join('/')] = path;
        });

        return ret;
    }
}

module.exports = {
    entry: entryObject('index.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            { test: /\.(t|j)s?$/, use: { loader: 'ts-loader' } },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    devtool: "source-map"
}