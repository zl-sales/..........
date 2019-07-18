"use strict";
const webpack = require("webpack"); // 配置发文编辑增加的 jquery 的引用
const path = require("path");
// 多进程优化打包速度
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
// 依赖可视化
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");



const resolve = dir => {
  // resolve 解决
  return path.join(__dirname, dir); // 将多个参数字符串合并成一个路径字符串
};
// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
const BASE_URL = process.env.NODE_ENV === "production" ? "/" : "/";
module.exports = {
  css: {
    loaderOptions: {
      // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  },
  // 配置发文编辑增加的 jquery 的引用
  configureWebpack: {
    externals: {
      moment: "moment",
      vue:'Vue',
      iview:'iview',
      'element-ui':'ELEMENT'
    },
    plugins: [
      // new BundleAnalyzerPlugin({ analyzerPort: 8919 }),
      new ParallelUglifyPlugin({
        uglifyJS: {
          output: {
            comments: false
          },
          warnings: false,
          compress: {
            drop_debugger: false,
            drop_console: false,
            collapse_vars: false,
            collapse_vars: false
          }
        },
        test: /.js$/g,
        include: [],
        exclude: [],
        cacheDir: ".cache/",
        workerCount: "",
        sourceMap: false
      }),
      new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery"
        // 'window.Quill': 'quill/dist/quill.js',
        // 'Quill': 'quill/dist/quill.js'
      })
    ]
  },
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  baseUrl: BASE_URL,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src")) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set("_c", resolve("src/components"))
      .set("_l", resolve("src/libs"));
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  // 它支持webPack-dev-server的所有选项
  devServer: {
    // host:'192.168.10.192',
    host: "localhost",
    port: 8081, // 端口号
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器
    proxy: {
      "/api": {
        // target: "http://192.168.10.220:8081/", // 本地
        target: "http://dev-api.qingniaokx.com/", // 设置你调用的接口域名和端口号 别忘了加http'http://5000.gr02e21d.ld2owfz8.b728a2.grapps.cn/'
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/" // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        }
      }
    }
  }
};
