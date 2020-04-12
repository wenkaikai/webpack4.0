const webpack = require("webpack");
const merge = require("webpack-merge")
const common = require("./config.common.js")
const dev = {
    mode: "development",//development
    devtool: "cheap-module-eval-source-map",
    devServer: {
        open: true,
        // contentBase: "../dist",
        hot: true,// 改变css 样式不刷新页
        port:80,
        hotOnly: true, // 这个加上了页面改变了不会自动刷新了。
        index:"index.html",
        host:"localhost",
        proxy:{
            "/react/api":{
                target:"http://www.dell-lee.com",
                pathRewrite:{
                    "header.json":"demo.json"
                },
                secure:false,//如果是https 
            }
        },
        historyApiFallback:true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    optimization:{
        usedExports:true
    }
}
module.exports = merge(common,dev)

/**
 *  mode 
 * entry
 * output
 * moudule
 * plugins
 * devserver
 * devtool
 * optimization
 */
