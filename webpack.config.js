/*__dirname 是node.js中的一个全局变量，它指向当前执行脚本所在的目录*/
var path = require('path'),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin');
// var hotModuleReplacementPlugin = require("webpack/lib/HotModuleReplacementPlugin");
console.log('__dirname:' + __dirname)

module.exports = {
    // 输入输出
    entry: path.join(__dirname, 'src/app.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        // 下面的路径相对于path
        filename: '[name].js'
    },

    module: {
        loaders: [
            { test: /\.vue$/, loader: 'vue' },
            { test: /\.json$/, loader: 'json' },
            { test: /\.css$/, loader: 'style!css?modules!postcss' },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
        ]
    },

    postcss: [
        autoprefixer //调用autoprefixer插件y
    ],
    babel: {
        presets: ['es2015'] // es5标准
    },

    plugins: [
        // new hotModuleReplacementPlugin(),
        new webpack.BannerPlugin('study for webpack.config created by Chan'),
        // 在全局中添加变量
        new webpack.DefinePlugin({
            'process.env.NODE.ENV': "development"
        }),
        // 自动require我们经常需要的包
        new webpack.ProvidePlugin({
            $: 'jquery',
            bootstrap: 'bootstrap'
        }),
        new webpack.HotModuleReplacementPlugin(),
        // 压缩HTML
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            // favicon: './src/img/favicon.ico', //favicon路径
            filename: '/index.html', //生成的html存放路径，相对于 path
            template: './src/index.html', //html模板路径
            inject: true, //允许插件修改哪些内容，包括head与body
            hash: true, //为静态资源生成hash值
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: true //删除空白符与换行符
            }
        })
        // // 压缩js、css
        // new webpack.optimize.UglifyJsPlugin({ //压缩代码
        //     compress: {
        //         warnings: false
        //     },
        //     except: ['$super', '$', 'exports', 'require'] //排除关键字
        // }),
    ],

    // 调试
    devtool: 'eval-source-map', //配置生成Source Maps，选择合适的选项

    // 服务器
    devServer: {
        contentBase: __dirname + '/dist', //本地服务器所加载的页面所在的目录
        // port: 0514, //设置默认监听端口，如果省略，默认为"8080"
        // colors: true, //终端中输出结果为彩色
        // historyApiFallback: true, //不跳转,在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        inline: true, //实时刷新
        hot: true
            // progress: true
    }
}

/*进度
运行webpack --progress --colors --watch ，可进行编译
todo
2、文件编译*/

/*var webpack = require("webpack");
var AssetsPlugin = require("assets-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //压缩引用文件到单独文件
var hotModuleReplacementPlugin = require("webpack/lib/HotModuleReplacementPlugin"); //热加载
var CommonChunkPlugin = require("webpack/lib/optimize/CommonChunkPlugin"); //提取公共代码

module.exportr = {
    output: {
        //path: __dirname, //打包输出目录
        path: "dist", //打包输出目录
        publicPath: "/static/", //weboack-dev-server访问路径
        filename: "[name]-[chunkhash].js", //输出文件名
        chunkFilename: "bundle-[chunkhash].js" //输出chunk文件名
    },
    plugin: [
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("[name]-[contenthash].css"),
        new hotModuleReplacementPlugin(),
        new CommonChunkPlugin({
            // minChunks: 3,
            name: "common-app.chunk",
            chunks: ["home", "detail", "list"]
        }),
        new AssetsPlugin({
            filename: "./source-map.json",
            prettyPrint: true
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ],
    resolve: {
        moduleDirectories: ['.']
    }
};*/
