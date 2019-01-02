import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // component: resolve => require(['./views/Home.vue'], resolve)
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '',
          name: 'cartogram',
          component: () => import('@/components/main/cartogram/Cartogram.vue')
        },
        {
          path: '/knowledge',
          name: 'knowledge',
          component: () => import('@/components/main/knowledge/es6.vue')
        }
      ]
    },

  ]
})
