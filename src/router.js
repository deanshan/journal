import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [

    {
      path: '/',
      // component: resolve => require(['./views/Home.vue'], resolve)
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '',
          name: 'cartogram',
          component: () => import(/* webpackChunkName: "main" */'@/components/main/cartogram/Cartogram.vue')
        },
        {
          path: 'knowledge',
          name: 'knowledge',
          component: () => import(/* webpackChunkName: "main" */ '@/components/main/Knowledge.vue'),
          children: [
            {
              path: 'html',
              name: 'html',
              component: () => import(/* webpackChunkName: "knowledge" */ '@/components/main/knowledge/Html.vue')
            },
            {
              path: 'css',
              name: 'css',
              component: () => import(/* webpackChunkName: "knowledge" */ '@/components/main/knowledge/CSS.vue')
            },
            {
              path: 'javascript',
              name: 'javascript',
              component: () => import(/* webpackChunkName: "knowledge" */ '@/components/main/knowledge/Javascript.vue')
            },
            {
              path: 'es6',
              name: 'es6',
              component: () => import(/* webpackChunkName: "knowledge" */ '@/components/main/knowledge/ES6.vue')
            },
            {
              path: 'vue',
              name: 'vue',
              component: () => import(/* webpackChunkName: "knowledge" */ '@/components/main/knowledge/Vue.vue')
            }
          ]
        }
      ]
    },

  ]
})