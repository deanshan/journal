module.exports = {
  //  默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/
  //  如果被部署在一个子路径上，需要用这个选项指定这个子路径。例如，https://www.my-app.com/my-app/，则设置 baseUrl 为 /my-app/。
  baseUrl:
    process.env.NODE_ENV === "production" ? "/production-sub-path/" : "./",
  // 在npm run build时 生成文件的目录 type:string, default:'dist'
  // outputDir: "dist"
  lintOnSave: true, // 是否使用eslint
  productionSourceMap: false, //  生产源映射 如果您不需要生产时的源映射，设为false可以加速生产构建
  devServer: {
    port: 3000, //  端口号
    host: "localhost",
    https: false,
    open: true, //  自动启动浏览器
    proxy: {
      //  跨域代理
      "/api": {
        target: "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('markdown')
      .test(/\.markdown$/)
      .use('markdown-loader')
      .loader('markdown-loader')
      .end()
  }
};
