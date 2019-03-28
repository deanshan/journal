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
        },
        {
            path:'/itamCenter',
            component:Home,
            children: [
                {
                    path:'computeDevice',
                    name:'computeDevice',
                    component:() => import(/* webpackChunkName:'itamCenter' */ '@/components/main/itamCenter/assetManagement/ComputeDevice.vue'),
                },{
                    path:'computeAdd',
                    name:'computeAdd',
                    component:() => import(/* webpackChunkName:'itamCenter' */ '@/components/main/itamCenter/assetManagement/ComputeAdd.vue')
                },
                {
                    path:'networkDevice',
                    name:'networkDevice',
                    component:() => import(/* webpackChunkName:'itamCenter' */ '@/components/main/itamCenter/assetManagement/NetworkDevice.vue')
                },
                {
                    path:'storageDevice',
                    name:'storageDevice',
                    component:() => import(/* webpackChunkName:'itamCenter' */ '@/components/main/itamCenter/assetManagement/StorageDevice.vue')
                },
                {
                    path:'safety',
                    name:'securityDevice',
                    component:() => import(/* webpackChunkName:'itamCenter' */ '@/components/main/itamCenter/assetManagement/SecurityDevice.vue')
                },
                {
                    path:'peripheral',
                    name:'peripheralDevice',
                    component:() => import(/* webpackChunkName:'itamCenter' */ '@/components/main/itamCenter/assetManagement/PeripheralDevice.vue')
                },
                {
                    path:'dataCenter',
                    name:'datacenterList',
                    component:() => import(/* webpackChunkName:'itamCenter' */ '@/components/main/itamCenter/locationManagement/DatacenterList.vue')
                },
                {
                    path:'computerRoom',
                    name:'computerRoomList',
                    component:() => import(/* webpackChunkName:'itamCenter' */ '@/components/main/itamCenter/locationManagement/ComputerRoomList.vue')
                },
                {
                    path:'cabinet',
                    name:'cabinetList',
                    component:() => import(/* webpackChunkName:'itamCenter' */ '@/components/main/itamCenter/locationManagement/CabinetList.vue')
                },{
                    path:'cabinetAdd',
                    name:'cabinetAdd',
                    component:() => import(/* webpackChunkName:'itamCenter' */ '@/components/main/itamCenter/locationManagement/CabinetAdd.vue')
                }, {
                    path:'cabinetDetail',
                    name:'cabinetDetail',
                    component:() => import(/* webpackChunkName:'itamCenter' */ '@/components/main/itamCenter/locationManagement/CabinetDetail.vue')
                },
                {
                    path:'label',
                    name:'labelList',
                    component:() => import(/* webpackChunkName:'itamCenter' */ '@/components/main/itamCenter/locationManagement/LabelList.vue')
                },
                {
                  path:'labelAdd',
                  name:'labelAdd',
                  component:() => import(/* webpackChunkName:'itamCenter' */ '@/components/main/itamCenter/locationManagement/LabelAdd.vue')
                },
                {
                    path:'labelDetail',
                    name:'labelDetail',
                    component:() => import(/* webpackChunkName:'itamCenter' */ '@/components/main/itamCenter/locationManagement/LabelDetail.vue')
                },
                {
                    path:'vendor',
                    name:'vendorList',
                    component:() => import(/* webpackChunkName:'itamCenter' */ '@/components/main/itamCenter/supplierManagement/VendorList.vue')
                },
                {
                    path:'vendorAdd',
                    name:'vendorAdd',
                    component:() => import(/* webpackChunkName:'itamCenter' */ '@/components/main/itamCenter/supplierManagement/VendorAdd.vue')
                },
                {
                    path:'personnel',
                    name:'personnelList',
                    component:() => import(/* webpackChunkName:'itamCenter' */ '@/components/main/itamCenter/supplierManagement/PersonnelList.vue')
                },
                {
                    path:'personnelAdd',
                    name:'personnelAdd',
                    component:() => import(/* webpackChunkName:'itamCenter' */ '@/components/main/itamCenter/supplierManagement/PersonnelAdd.vue')
                },
                {
                    path:'personnelDetail',
                    name:'personnelDetail',
                    component:() => import(/* webpackChunkName:'itamCenter' */ '@/components/main/itamCenter/supplierManagement/PersonnelDetail.vue')
                },
                {
                    path:'model',
                    name:'modelList',
                    component:() => import(/* webpackChunkName:'itamCenter' */ '@/components/main/itamCenter/supplierManagement/ModelList.vue')
                },
                // {
                //     path:'modelAdd',
                //     name:'modelAdd',
                //     component:() => import(/* webpackChunkName:'itamCenter' */ '@/components/main/itamCenter/supplierManagement/ModelAdd.vue')
                // },
            ]
        },
        {
            path: '/monitorCenter',
            name: 'monitorCenter',
            component:Home,
            children: [
                {
                    path: 'resourceMonitor',
                    name: 'resourceMonitor',
                    component:() => import(/* webpackChunkName:"monitorCenter" */ '@/components/main/monitorManagement/ResourceMonitor.vue')
                },
                {
                    path: 'monitorResourceDetailView',
                    name: 'monitorResourceDetailView',
                    component:() => import(/* webpackChunkName:"monitorCenter" */ '@/components/main/monitorManagement/monitorResourceDetail/MonitorResourceDetail.vue')
                },
                {
                    path: 'monitorTemplate',
                    name: 'monitorTemplate',
                    component:() => import(/* webpackChunkName:"monitorCenter" */ '@/components/main/monitorManagement/MonitorTemplate.vue')
                },
                {
                    path: 'monitorTemplateDetail',
                    name: 'monitorTemplateDetail',
                    component:() => import(/* webpackChunkName:"monitorCenter" */ '@/components/main/monitorManagement/MonitorTemplateDetail.vue')
                },{
                    path:'monitorTemplateAdd',
                    name:'monitorTemplateAdd',
                    component:() => import(/* webpackChunkName:'monitorCenter' */ '@/components/main/monitorManagement/MonitorTemplateAdd.vue')
                },
                {
                    path: 'resourceAlarm',
                    name: 'resourceAlarm',
                    component:() => import(/* webpackChunkName:"monitorCenter" */ '@/components/main/monitorManagement/ResourceAlarm.vue')
                },
                {
                    path: 'resourceAlarmDetail',
                    name: 'resourceAlarmDetail',
                    component:() => import(/* webpackChunkName:"monitorCenter" */ '@/components/main/monitorManagement/ResourceAlarmDetail.vue')
                },
                {
                    path: 'noticeGroup',
                    name: 'noticeGroup',
                    component:() => import(/* webpackChunkName:"monitorCenter" */ '@/components/main/monitorManagement/NoticeGroup.vue')
                },
            ]
        },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
      {
          path: '/cmp-operation-page',
         redirect:'/cartogram/dataCenterView'
      },
  ]
})
