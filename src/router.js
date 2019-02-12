import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const Audio = () => import('@/components/common/Audio.vue')

export default new Router({
    mode: 'history',
    routes: [{
          path: '/',
          // component: resolve => require(['./views/Home.vue'], resolve)
          components: {
              default: () => import('./views/Home.vue'),
            //   Audio
          },
          children: [
              {
                  path: '',
                  name: 'cartogram',
                  component: () => import(/* webpackChunkName: "main" */'@/components/main/cartogram/Cartogram.vue')
              },
              {
                  path: 'knowledge',
                  name: 'knowledge',
                  component: () => import(/* webpackChunkName: "main" */ '@/components/main/knowledge/Knowledge.vue'),
                  children: [
                  {
                    path: 'html',
                    name: 'html',
                    component: () => import(/* webpackChunkName: "knowledge" */ '@/components/main/knowledge/HTML.vue')
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
              },
              {
                  path: 'music',
                  name: 'music',
                  component: () => import(/* webpackChunkName: "main" */ '@/components/main/music/Music.vue')
              },
              {
                  path: 'maps',
                  name: 'maps',
                  component: () => import(/* webpackChunkName: "main" */ '@/components/main/map/Maps.vue')
              }
          ]
    }]
})