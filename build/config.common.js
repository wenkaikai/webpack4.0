const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require("webpack");
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
module.exports = { 
    // entry:"./src/index.js", // 这个是下面的简写
    // 多入口文件要用htmlWebpackPlugin里面的参数chunks
    entry: {
        index: path.resolve(__dirname, "../src/index.js"),
        home: path.resolve(__dirname, "../src/home.js"),
        list: path.resolve(__dirname, "../src/list.js")

    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    // {
                    //     loader: 'imports-loader?this=>window'
                    // }
                ],

            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    //    loader:'file-loader'
                    loader: 'url-loader',
                    options: {
                        name: 'images/[name]_[hash].[ext]',
                        // outputPath: 'images/', 这里的效果是和上面是一样的
                        // publicPath:"123", // 跟output 里面的publicPath 的作用是一样的这里是在引入的图片前面加了123
                        limit: 0// 如果没有超过这个限制都是base64
                    }
                }
            },
            {
                test: /\.(svg|ttf|woff|eot)$/,
                use: ["file-loader"]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    // 'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            hmr: true,// 支持hmr
                        },
                    },
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
    output: {// 这个输出是总的输出（包括splitChunks 里面分割的文件也要走这个output配置文件）
        // filename: 'bundle.js',
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '../dist1'),
        // chunkFilename: '[name].chunks.js'
        // publicPath: "bundle/",// 当我们的idnex.html 和 bundle 不在一个目录下面的时候静态资源打包的时候要定义这个publicPath
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',//async initial(同步) 的集合（就是打包同步的代码还是异步的代码）
    //         minSize: 0,// 打包的大于这个数才会分割单位是bytes
    //         // maxSize: 3000,
    //         minChunks: 1,// 举个列子 lodash  如果有一个以下的文件引入lodash lodash就不会被分割。
    //         maxAsyncRequests: 5,// 同时加载五个js 的请求（就是一个页面如果引入了10个类库这样的话就会有五个会被单独的打包剩下的就会打包在一个js中）
    //         maxInitialRequests: 5,// 入口文件代码分割如果超过了引入超过了三个就不会做代码分割
    //         automaticNameDelimiter: '~',
    //         automaticNameMaxLength: 3,
    //         // name: true,
    //         cacheGroups: {// 打包同步的代码会走到这个缓存组中（这个是什么意思呢，就是当一个js打包的时候他并不着急的输出js 而是先放在缓存组中）
    //             // 我们如何把不同的工具打不同的包呢
    //             vendors: {// vendors 打包的这个组
    //                 //  test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
    //                 test: /[\\/]node_modules[\\/]/,// 如果这样的话就是所有的都会被打包到一个vndors一个包里面
    //                 priority: -10,// 优先级
    //                 name: 'vendors',// name 还要走output
    //                 // filename:"vendors.js"// 这样就不用走output 了直接是打包出来的是vendors.js
    //             },
    //             default: {
    //                 minChunks: 2,
    //                 priority: -20,
    //                 reuseExistingChunk: true// 如果一个模块已经被打包过了就不会再打包了而是知己的复用
    //             },
    //             styles: {
    //                 name: 'styles',
    //                 test: /\.(c|sc)ss$/,
    //                 chunks: 'all',
    //                 enforce: true,
    //             },
    //         }
    //     }
    // },
    plugins: [new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        title: "Index",
        template: "./index.html",
        filename: "index.html",
        chunks: ["vendors", "index"] // 指定加载哪几个js组件
    }),
    new HtmlWebpackPlugin({
        title: "Home",
        template: "./index.html",
        filename: "home.html",
        chunks: ["vendors", "home"] // 指定加载哪几个js组件
    }),
    new HtmlWebpackPlugin({
        title: "List",
        template: "./index.html",
        filename: "list.html",
        chunks: ["list", "vendors"] // 指定加载哪几个js组件
    }),
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
        ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new webpack.ProvidePlugin({
        $: 'jquery'// 当页面上用到了$  就会自动的帮你引用 jquery
    }),
    new CopyPlugin([
        {
            from: "fonts",
            to: "src"
        }
    ])
        // new WorkboxPlugin.GenerateSW({
        //     // these options encourage the ServiceWorkers to get in there fast
        //     // and not allow any straggling "old" SWs to hang around
        //     clientsClaim: true,
        //     skipWaiting: true
        // })
    ]
}