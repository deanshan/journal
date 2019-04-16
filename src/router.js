import Vue from 'vue'
import store from './store'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)


// FIXME:页面刷新时，重新赋值token
if (sessionStorage.getItem('token')) {

    store.commit('SET_TOKEN', { token: sessionStorage.getItem('token') })
}


const Audio = () => import('@/components/common/Audio.vue')

export default new Router({
    // mode: 'history', //FIXME:需要在服务器端配置才能使用
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
            component:() => import(/* webpackChunkName:"account" */ '@/components/account/Login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component:() => import(/* webpackChunkName:"account" */ '@/components/account/Register.vue')
        },
        {
            path: '/cartogram',
            name: 'cartogram',
            component: Home,
            children: [
                {
                    path: 'star',
                    name: 'star',
                    component:() => import(/* webpackChunkName:"cartogram" */ '@/components/main/cartogram/Star.vue')
                },
                {
                    path: 'matrix',
                    name: 'matrix',
                    component:() => import(/* webpackChunkName:"cartogram" */ '@/components/main/cartogram/Matrix.vue')
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
                    component:() => import(/* webpackChunkName:"knowledge" */ '@/components/main/knowledge/html/HTML.vue')
                },
                {
                    path:'css',
                    name:'css',
                    component:() => import(/* webpackChunkName:"knowledge" */ '@/components/main/knowledge/css/CSS.vue')
                },
                {
                    path:'javascript',
                    name:'javascript',
                    component:() => import(/* webpackChunkName:"knowledge" */ '@/components/main/knowledge/javascript/JavaScript.vue')
                },
                {
                    path:'es6',
                    name:'es6',
                    component:() => import(/* webpackChunkName:"knowledge" */ '@/components/main/knowledge/es6/ES6.vue')
                },
                {
                    path:'vue',
                    name:'vue',
                    component:() => import(/* webpackChunkName:"knowledge" */ '@/components/main/knowledge/vue/VUE.vue')
                },
                {
                    path:'fetch',
                    name:'fetch',
                    component:() => import(/* webpackChunkName:"knowledge" */ '@/components/main/knowledge/fetch/Fetch.vue')
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
                    component: () => import(/* webpackChunkName:"pleasure" */ '@/components/main/pleasure/music/Music.vue'),
                    children: [
                        // {
                        //     path: '',
                        //     name: 'recommend',
                        //     component:() => import(/* webpackChunkName:"music" */ '@/components/main/pleasure/music/recommend/Recommend.vue')
                        // },
                        {
                            path: '',
                            name: 'play',
                            components: {
                                default: () => import(/* webpackChunkName:"music" */ '@/components/main/pleasure/music/play/Play.vue'),
                                songTitle: () => import(/* webpackChunkName:"music" */ '@/components/main/pleasure/music/play/SongTitle.vue'),
                                playControl: () => import(/* webpackChunkName:"music" */ '@/components/main/pleasure/music/play/PlayControl.vue'),
                                Audio
                            },
                            children: [
                                {
                                    path: 'lyric',
                                    name: 'lyric',
                                    component: resolve => require(['@/components/main/pleasure/music/play/Lyric.jsx'], resolve)
                                },
                                {
                                    path: 'list',
                                    name: 'list',
                                    component: resolve => require(['@/components/main/pleasure/music/play/List.vue'], resolve)
                                }
                            ]

                        }
                    ]
                },
                // {
                //     path: 'music',
                //     components: {
                //         default: () => import(/* webpackChunkName:"pleasure" */ '@/components/main/pleasure/music/Music.vue'),
                //         songTitle: () => import(/* webpackChunkName:"pleasure" */ '@/components/main/pleasure/music/SongTitle.vue'),
                //         playControl: () => import(/* webpackChunkName:"pleasure" */ '@/components/main/pleasure/music/PlayControl.vue'),
                //         Audio
                //     },
                //     children: [
                //         {
                //             path: '',
                //             name: 'play',
                //             component: resolve => require(['@/components/main/pleasure/music/Play.vue'], resolve)
                //         },
                //         {
                //             path: 'lyric',
                //             name: 'lyric',
                //             component: resolve => require(['@/components/main/pleasure/music/Lyric.jsx'], resolve)
                //         },
                //         {
                //             path: 'list',
                //             name: 'list',
                //             component: resolve => require(['@/components/main/pleasure/music/List.vue'], resolve)
                //         }
                //     ]
                // }
            ]
        },
  ]
})
