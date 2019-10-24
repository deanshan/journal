import Vue from 'vue'
import store from './store'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)


// FIXME:页面刷新时，重新赋值token
if (sessionStorage.getItem('token')) {

    store.commit('SET_TOKEN', { token: sessionStorage.getItem('token') })
}


// const Audio = () => import('@/components/Audio.vue')

export default new Router({
    mode: 'history', //FIXME:需要在服务器端配置才能使用
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            redirect: () => {
                // return '/cartogram/star'
                return '/login'
            }
        },
        {
            path: '/login',
            name: 'login',
            component:() => import(/* webpackChunkName:"account" */ '@/views/account/Login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component:() => import(/* webpackChunkName:"account" */ '@/views/account/Register.vue')
        },
        {
            path: '/cartogram',
            name: 'cartogram',
            component: Home,
            children: [
                {
                    path: 'star',
                    name: 'star',
                    component:() => import(/* webpackChunkName:"cartogram" */ '@/views/main/cartogram/Star.vue')
                },
                {
                    path: 'matrix',
                    name: 'matrix',
                    component:() => import(/* webpackChunkName:"cartogram" */ '@/views/main/cartogram/Matrix.vue')
                }
            ]
        },
        {
            path:'/knowledge',
            component:Home,
            children:[
                {
                    path:'html',
                    name:'html',
                    component:() => import(/* webpackChunkName:"knowledge" */ '@/views/main/knowledge/HTML.vue')
                },
                {
                    path:'css',
                    name:'css',
                    component:() => import(/* webpackChunkName:"knowledge" */ '@/views/main/knowledge/CSS.vue')
                },
                {
                    path:'javascript',
                    name:'javascript',
                    component:() => import(/* webpackChunkName:"knowledge" */ '@/views/main/knowledge/JavaScript.vue')
                },
                {
                    path:'es6',
                    name:'es6',
                    component:() => import(/* webpackChunkName:"knowledge" */ '@/views/main/knowledge/ES6.vue')
                },
                {
                    path:'vue',
                    name:'vue',
                    component:() => import(/* webpackChunkName:"knowledge" */ '@/views/main/knowledge/VUE.vue')
                },
                {
                    path:'fetch',
                    name:'fetch',
                    component:() => import(/* webpackChunkName:"knowledge" */ '@/views/main/knowledge/Fetch.vue')
                },
            ]
        },
        {
            path: '/pleasure',
            name: 'pleasure',
            component: Home,
            children: [
                {
                    path: 'music',
                    // name: 'music',
                    component: () => import(/* webpackChunkName:"pleasure" */ '@/views/main/pleasure/music/Music.vue'),
                    children: [
                        {
                            path: '',
                            name: 'recommend',
                            component:() => import(/* webpackChunkName:"music" */ '@/views/main/pleasure/music/recommend/Recommend.vue')
                        },
                        {
                            path: '',
                            // name: 'play',
                            components: {
                                default: () => import(/* webpackChunkName:"music" */ '@/views/main/pleasure/music/play/Play.vue'),
                                songTitle: () => import(/* webpackChunkName:"music" */ '@/views/main/pleasure/music/play/SongTitle.vue'),
                                playControl: () => import(/* webpackChunkName:"music" */ '@/views/main/pleasure/music/play/PlayControl.vue')
                            },
                            children: [
                                {
                                    path: '',
                                    name: 'playCover',
                                    component: resolve => require(['@/views/main/pleasure/music/play/PlayCover.vue'], resolve)
                                },
                                {
                                    path: 'lyric',
                                    name: 'lyric',
                                    component: resolve => require(['@/views/main/pleasure/music/play/Lyric.jsx'], resolve)
                                },
                                {
                                    path: 'list',
                                    name: 'list',
                                    component: resolve => require(['@/views/main/pleasure/music/play/List.vue'], resolve)
                                }
                            ]

                        }
                    ]
                }
            ]
        },
  ]
})
