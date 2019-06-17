import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//element-ui
import './plugins/element.js'
//echarts
import echarts from 'echarts'
import 'echarts/theme/macarons.js'  //echarts主题
//baidu-map
import baiduMap from 'vue-baidu-map'

//全局样式
import "./sass/global/reset.scss";
import "./sass/global/global.scss";
import "./sass/global/font-special.scss";
// 字体图标样式
import "./sass/global/iconfont.scss";
// import 'font-awesome/scss/font-awesome.scss'

// utils
import { https } from './utils/https.js'

// 验证用户登录状态
// router.beforeEach((to, from, next) => {
//TODO:未判断注册页面
//     if(to.name === 'login') {   // 登录页面
//         next()
//     } else {    //非登录页面
//         //FIXME:可以通过sessionStorage获取token，此处在路由(router.js)加载前已重新把token存储到vuex
//         if(store.state.token) {
//             next()
//         } else {
//             // 退出页面，进行登录页面或指定页面
//             next('/login')
//         }
//     }
// })

Vue.use(baiduMap, { ak: 'DlBAFrcThN8g3kkbfRcfnrHS1pWUwDeS' })

Vue.prototype.$echarts = echarts
Vue.prototype.$https = https

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')