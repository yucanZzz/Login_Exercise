const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // devtool: "source-map",
    mode: 'development',
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node-modules/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    cacheCompression: false
                }
            },
            {
                test: /\.js|\.ts$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test:/\.scss$/,
                use:[{loader: 'style-loader'}, {loader: 'css-loader'},{loader: 'sass-loader'}]
            },
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './public'),
        },
        hot: true,
        compress: true,
        port: 3000,
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({}),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),
            filename: 'index.html'
        })
    ]
};