import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import echarts from 'echarts'

import marked from 'marked'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

import "./sass/global/reset.scss";
import "./sass/global/global.scss";
import "./sass/global/font-special.scss";

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$marked = marked

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
