const merge = require("webpack-merge")
const common = require("./config.common.js")
const pro ={
    mode: "production",
    devtool: "cheap-module-source-map",
}
module.exports = merge(common,pro)