import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios'

//element-ui
import './plugins/element.js'
//echarts
import echarts from 'echarts'
import 'echarts/theme/macarons.js'
//baidu-map
import baiduMap from 'vue-baidu-map'


//全局样式
import "./sass/global/reset.scss";
import "./sass/global/global.scss";
import "./sass/global/font-special.scss";
// 字体图标样式
import "./sass/global/iconfont.scss";
import 'font-awesome/scss/font-awesome.scss'

// utils
import { https } from './utils/https.js'

// 路由拦截用户登录状态来判断跳转到首页还是登录页
// router.beforeEach((to, from, next) => {
//     if(from.path === '/') {
//         axios
//             .get('/auth/session', {params: { token: sessionStorage.getItem('token') }} )
//             .then(res => {
//                 let data = res.data
//                 if(data.code === 200 && data.result) {
//                     sessionStorage.setItem("user",JSON.stringify(data.result))
//                     next()
//                 } else {
//                     Message(data.msg)
//                     setTimeout(() => {
//                         // window.open(`${baseUrl}/login.jsp`,"_self")
//                     }, 1000)
//                 }
//             })
//             .catch(error => {
//                 Message('获取用户信息失败，请重新登录！')
//                 setTimeout(() => {
//                     // window.open(`${baseUrl}/login.jsp`,"_self")
//                 }, 1000)
//             })
//     } else {
//         next()
//     }
// })


// import { conversionType, getStatusStyle, getPlatformUrl } from './utils/common.js'
// import * as constant from './utils/constant.js'
// import { getToken } from '@/utils/cache.js'
// Vue.prototype.$getToken = getToken
// Vue.prototype.$conversionType = conversionType
// Vue.prototype.$getStatusStyle = getStatusStyle
// Vue.prototype.$getPlatformUrl = getPlatformUrl
// Vue.prototype.$constant = constant

// Vue.use(axios)
Vue.use(baiduMap, { ak: 'DlBAFrcThN8g3kkbfRcfnrHS1pWUwDeS' })

Vue.prototype.$echarts = echarts
Vue.prototype.$https = https

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')