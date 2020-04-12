const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
module.exports = {
    // entry:"./src/index.js", // 这个是下面的简写
    mode: "development",//development
    entry: {
        main: "./src/index.js"
    },
    devtool: "cheap-module-eval-source-map",
    devServer: {
        open: true,
        contentBase: "./bundle",
        hot: true,// 改变css 样式不刷新页
        hotOnly: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    //    loader:'file-loader'
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: 'images/',
                        limit: 1024// 如果没有超过这个限制都是base64
                    }
                }
            },
            {
                test: /\.(svg|ttf|woff|eot)$/,
                use: ["file-loader"]
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            // modules: true,// css 模块化
                            importLoaders: 2// 如果scss 里面引入了scss 需要这个配置加载前面三个loader
                        }
                    }, 'sass-loader', 'postcss-loader']
            }
        ]
    },
    output: {
        // filename: 'bundle.js',
        filename: '[name].js',
        path: path.resolve(__dirname, 'bundle'),
        // publicPath: "bundle/",// 当我们的idnex.html 和 bundle 不在一个目录下面的时候静态资源打包的时候要定义这个publicPath
    },
    plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin({
        title: "HtmlWebpackPlugin",//生成html文件的标题 filename 输出的html的文件名称
        template: "./index.html"//
    }), new webpack.HotModuleReplacementPlugin()
    ],
    optimization:{
        usedExports:true
    }
}