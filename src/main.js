import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

//element-ui
import './plugins/element.js'

//echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//baidu-map
import baiduMap from 'vue-baidu-map'
Vue.use(baiduMap, {
  ak: 'DlBAFrcThN8g3kkbfRcfnrHS1pWUwDeS'
})

import marked from 'marked'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)
Vue.prototype.$marked = marked

//全局样式
import "./sass/global/iconfont.scss";
import "./sass/global/reset.scss";
import "./sass/global/global.scss";
import "./sass/global/font-special.scss";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
