module.exports = {
    baseUrl: process.env.NODE_ENV === "production" ? "./" : "/",
    lintOnSave: true, // 是否使用eslint
    productionSourceMap: false, //  生产源映射 如果您不需要生产时的源映射，设为false可以加速生产构建
    devServer: {
        port: 3000,     // 端口号
        host: "localhost",
        https: false,
        open: true,     // 自动启动浏览器
        proxy: {
            '/server': {
              target: 'http://10.2.103.236:3100',
              // target: 'http://169.254.186.21:3100',
              ws: true,
              changeOrigin: true,
              pathRewrite: {
                '^/server': ''
              }
            },
            "/api": {
                target: "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                  "^/api": ""
                }
            },
            '/vKey': {
                target: 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                  '^/vKey': ''
                }
            },
            '/lyric': {
                target: 'http://ustbhuangyi.com/music/api/lyric',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                  '^/lyric': ''
                }
            }
        }
    }
};
