import Vue from 'vue'
import store from './store'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)


// FIXME:页面刷新时，重新赋值token
if (sessionStorage.getItem('token')) {
    console.log(store)
    store.commit('SET_TOKEN', {token: sessionStorage.getItem('token')})
}


// const Audio = () => import('@/components/common/Audio.vue')

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
            path:'/resourceCenter',
            component:Home,
            children:[
                {
                    path:'host',
                    name:'host',
                    component:() => import(/* webpackChunkName:"resourceCenter" */ '@/components/main/resourceCenter/computingService/Host.vue')
                },
                {
                    path:'hostDetail',
                    name:'hostDetail',
                    component:() => import(/* webpackChunkName:"resourceCenter" */ '@/components/main/resourceCenter/computingService/HostDetail.vue')
                },
                {
                    path:'hostImage',
                    name:'hostImage',
                    component:() => import(/* webpackChunkName:"resourceCenter" */ '@/components/main/resourceCenter/computingService/HostImage.vue')
                },
                {
                    path:'hostImageDetail',
                    name:'hostImageDetail',
                    component:() => import(/* webpackChunkName:"resourceCenter" */ '@/components/main/resourceCenter/computingService/HostImageDetail.vue')
                },
                {
                    path:'disk',
                    name:'disk',
                    component:() => import(/* webpackChunkName:'resourceCenter' */ '@/components/main/resourceCenter/computingService/Disk.vue')
                },
                {
                    path:'diskDetail',
                    name:'diskDetail',
                    component:() => import(/* webpackChunkName:"resourceCenter" */ '@/components/main/resourceCenter/computingService/DiskDetail.vue')
                },
                {
                    path:'diskSnapshot',
                    name:'diskSnapshot',
                    component:() => import(/* webpackChunkName:'resourceCenter' */ '@/components/main/resourceCenter/computingService/DiskSnapshot.vue')
                },
                {
                    path:'diskSnapshotDetail',
                    name:'diskSnapshotDetail',
                    component:() => import(/* webpackChunkName:'resourceCenter' */ '@/components/main/resourceCenter/computingService/DiskSnapshotDetail.vue')
                },
                {
                    path:'keypair',
                    name:'keypair',
                    component:() => import(/* webpackChunkName:'resourceCenter' */ '@/components/main/resourceCenter/computingService/Keypair.vue')
                },
                {
                    path:'keypairDetail',
                    name:'keypairDetail',
                    component:() => import(/* webpackChunkName:'resourceCenter' */ '@/components/main/resourceCenter/computingService/KeypairDetail.vue')
                },
                {
                    path:'securityGroup',
                    name:'securityGroup',
                    component:() => import(/* webpackChunkName:'resourceCenter' */ '@/components/main/resourceCenter/computingService/SecurityGroup.vue')
                },
                {
                    path:'securityGroupDetail',
                    name:'securityGroupDetail',
                    component:() => import(/* webpackChunkName:'resourceCenter' */ '@/components/main/resourceCenter/computingService/SecurityGroupDetail.vue')
                },
                {
                    path:'vpc',
                    name:'vpc',
                    component:() => import(/* webpackChunkName:'resourceCenter' */ '@/components/main/resourceCenter/networkService/Vpc.vue')
                },
                {
                    path:'vpcDetail',
                    name:'vpcDetail',
                    component:() => import(/* webpackChunkName:'resourceCenter' */ '@/components/main/resourceCenter/networkService/VpcDetail.vue')
                },
                {
                    path:'floatingIP',
                    name:'floatingIP',
                    component:() => import(/* webpackChunkName:'resourceCenter' */ '@/components/main/resourceCenter/networkService/FloatingIp.vue')
                },
                {
                    path:'floatingIpDetail',
                    name:'floatingIpDetail',
                    component:() => import(/* webpackChunkName:'resourceCenter' */ '@/components/main/resourceCenter/networkService/FloatingIpDetail.vue')
                },
                {
                    path:'firewall',
                    name:'firewall',
                    component:() => import(/* webpackChunkName:'resourceCenter' */ '@/components/main/resourceCenter/networkService/Firewall.vue')
                },
                {
                    path:'firewallDetail',
                    name:'firewallDetail',
                    component:() => import(/* webpackChunkName:'resourceCenter' */ '@/components/main/resourceCenter/networkService/FirewallDetail.vue')
                },
            ]
        }
  ]
})
