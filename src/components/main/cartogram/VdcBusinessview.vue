<template>
    <div class="operation-main-content">
        <!-- 导向 -->
        <div class="nav-title">
            <nav-title :titles="['运维中心','视图管理','资源池监控']"></nav-title>
        </div>
        <!-- 主体 -->
        <div class="main-content">
           <el-row :gutter="10">
               <el-col :span="24">
                   <div class="tab-vdc-list">
                       <el-tabs v-model="activeName">
                           <el-tab-pane v-for="(item,index) in vdcList"
                                        :key="index"
                                        :label="item.name"
                                        :name="item.vdcId">
                           </el-tab-pane>
                       </el-tabs>
                   </div>
               </el-col>
               <el-col :span="24">
                   <el-row :gutter="10">
                       <el-col :span="16">
                           <el-row :gutter="10">
                               <el-col :span="24" style="margin-bottom: 10px;padding-left: 20px;padding-right: 0;">
                                   <el-col :span="8" v-for="(item,countIndex) in cardList.list"
                                           :key="item.name+'_'+countIndex">
                                       <el-card shadow="never"
                                                :style="{backgroundColor:colorArr[countIndex],borderRadius:0}">
                                           <img :src="item.icon" class="icon_img"/>
                                           <p class="service-title">{{ item.name }} : {{ item.count }}</p>
                                       </el-card>
                                   </el-col>
                               </el-col>
                               <el-col :span="24" style="padding-left: 25px;">
                                   <div id="tree-chart" style="width: 100%;height: 1125px;"></div>
                               </el-col>
                           </el-row>
                       </el-col>
                       <el-col :span="8">
                           <el-col :span="24" v-for="(item,subIndex) in barList" class="bar-list"
                                   :key="item.id+'_'+subIndex">
                               <view-bar :id="item.id"
                                         :barData="item.itemData"
                                         :title="item.title" :unit="item.unit"
                                         :bgColor="item.bgColor"></view-bar>
                           </el-col>
                       </el-col>
                   </el-row>
               </el-col>
           </el-row>
        </div>
    </div>
</template>

<script>
    import navTitle from '@/components/common/NavTitle'
    import ViewBar from '@/components/common/ViewBar'
    import { EleResize } from '@/utils/resize.js'
    import {SUCCESS_CODE} from "@/utils/constant";
    //引入图片
    import vdcPng from '@/assets/images/vdc.png'
    import vpcPng from '@/assets/images/vpc.png'
    import subnetPng from '@/assets/images/subnet.png'
    import vhostPng from '@/assets/images/vhost.png'
    import vhostRedPng from '@/assets/images/vmRedAlarm.png'
    //icon
    import vpcIcon from '@/assets/images/vpc_icon.png'
    import subnetIcon from '@/assets/images/subnet_icon.png'
    import hostIcon from '@/assets/images/host_icon.png'

    export default {
        name: "vdcBusinessview",
        data() {
            return {
                vdcList:[],
                activeName:'0',
                viewData:{},
                colorArr:['#2ec7c9','#d87a80','#8d98b3','#ffb980','#5ab1ef','#b6a2de',
                    '#e5cf0d','#97b552','#95706d','#dc69aa',
                    '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
                    '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
                ],
                vpcCount:0,
                subnetCount:0,
                hostCount:0,
                barViewData:{}
            }
        },
        computed:{
            consoleUrl(){
                return sessionStorage.getItem(this.$constant.APP_KEY.console)
            },
            operationUrl(){
                return sessionStorage.getItem(this.$constant.APP_KEY.operation)
            },
            cardList(){
                return {
                    list:[{
                        name:'VPC',
                        icon:vpcIcon,
                        count:this.vpcCount
                    },{
                        name:'子网',
                        icon:subnetIcon,
                        count:this.subnetCount
                    },{
                        name:'虚拟机',
                        icon:hostIcon,
                        count:this.hostCount
                    }]
                }
            },
            barList(){
                return [{
                    id:'cpu-top',
                    title:'CPU使用率最高-TOP5',
                    unit:'%',
                    bgColor:'rgba(150, 141, 155, 0.1)',
                    itemData:this.barViewData.cpuTop5
                },{
                    id:'cpu-bottom',
                    title:'CPU使用率最底-TOP5',
                    unit:'%',
                    bgColor:'rgba(150, 141, 155, 0.1)',
                    itemData:this.barViewData.cpuLast5
                },{
                    id:'memory-top',
                    title:'内存使用率最高-TOP5',
                    unit:'%',
                    bgColor:'rgba(150, 141, 155, 0.1)',
                    itemData:this.barViewData.memoryTop5
                },{
                    id:'memory-bottom',
                    title:'内存使用率最低-TOP5',
                    unit:'%',
                    bgColor:'rgba(150, 141, 155, 0.1)',
                    itemData:this.barViewData.memoryLast5
                }]
            }
        },
        components:{
            navTitle,
            ViewBar
        },
        watch:{
            activeName(){
                this.$nextTick(() => {
                    if (this.activeName) {
                        this.getViewData(this.activeName)
                        this.getBarData(this.activeName)
                    }
                })
            }
        },
        created(){
            this.getVdcList()
        },
        methods:{
            getVdcList(){
                this.$https.get(`${this.consoleUrl}/vdc/list`,{
                    status:this.$constant.PUBLISH_STATUS.yes
                })
                    .then(res => {
                        if(res.code == this.$constant.SUCCESS_CODE){
                            this.vdcList = res.result.list
                            this.activeName = this.vdcList[0].vdcId
                        }
                    })
            },
            getViewData(vdcId){
                this.$https.get(`${this.operationUrl}/topologicalGraph/query`,{
                    assetId:vdcId
                })
                    .then(res => {
                        if(res.code == this.$constant.SUCCESS_CODE){
                            this.viewData = res.result
                            if(this.viewData != null){
                                this.initTreeData(this.viewData)
                            }else{
                                this.initTreeData({})
                            }
                        }
                    })
            },
            getBarData(vdcId){
                this.axios.all([this.axios.get(`${this.operationUrl}/vHost/listCpuByVdc`,{
                    params:{
                        vdcId:vdcId
                    },
                    header:{
                        token:sessionStorage.getItem('token')
                    }
                }),this.axios.get(`${this.operationUrl}/vHost/listMemoryByVdc`,{
                    params:{
                        vdcId:vdcId
                    },
                    header:{
                        token:sessionStorage.getItem('token')
                    }
                })])
                    .then(this.axios.spread((res1,res2) => {
                        let cpuTop5 = res1.data.top_5
                        let cpuLast5 = res1.data.last_5
                        let memoryTop5 = res2.data.top_5
                        let memoryLast5 = res2.data.last_5
                        cpuTop5.forEach((item) => {
                            item.value = item.value * 100
                        })
                        cpuLast5.forEach((item) => {
                            item.value = item.value * 100
                        })
                        memoryTop5.forEach((item) => {
                            item.value = item.value * 100
                        })
                        memoryLast5.forEach((item) => {
                            item.value = item.value * 100
                        })
                        // array2.data.forEach((item) => {
                        //     item.forEach((subItem) => {
                        //         subItem.value = subItem.value * 100
                        //     })
                        // })
                        // console.log(array1)
                        console.log(cpuTop5)
                        this.barViewData = {
                            cpuTop5: cpuTop5,
                            cpuLast5: cpuLast5,
                            memoryTop5: memoryTop5,
                            memoryLast5: memoryLast5
                        }
                    }))
            },
            initTreeData(chartData){
                let domId = document.getElementById('tree-chart')
                let myChart = this.$echarts.init(domId)
                this.vpcCount = 0
                this.subnetCount = 0
                this.hostCount = 0
                // chartData = {
                //     name:'测试VDC',
                //     children:[{
                //         name:'VPC01',
                //         assetType:'VPC',
                //         children:[{
                //             name:'子网01',
                //             assetType:'SUBNET',
                //             children:[{
                //                 name:'虚拟机01',
                //                 assetType:'HOST',
                //             },{
                //                 name:'虚拟机02',
                //                 assetType:'HOST',
                //             },{
                //                 name:'虚拟机03',
                //                 assetType:'HOST',
                //             }]
                //         },{
                //             name:'子网02',
                //             assetType:'SUBNET',
                //             children:[{
                //                 name:'虚拟机01',
                //                 assetType:'HOST',
                //             },{
                //                 name:'虚拟机02',
                //                 assetType:'HOST',
                //             }]
                //         },{
                //             name:'子网03',
                //             assetType:'SUBNET',
                //             children:[{
                //                 name:'虚拟机01',
                //                 assetType:'HOST',
                //             },{
                //                 name:'虚拟机02',
                //                 assetType:'HOST',
                //             }]
                //         }]
                //     },{
                //         name:'VPC02',
                //         assetType:'VPC',
                //         children:[{
                //             name:'子网01',
                //             assetType:'SUBNET',
                //         },{
                //             name:'子网02',
                //             assetType:'SUBNET',
                //         },{
                //             name:'子网03',
                //             assetType:'SUBNET',
                //         }]
                //     }]
                // }
                this.traverseTree(chartData)
                let option = {
                    backgroundColor:'rgba(150, 141, 155, 0.1)',
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove',
                        backgroundColor:'#FFFFFF',
                        padding:10,
                        formatter:function(params){
                            var content = ''
                            switch (params.data.assetType) {
                                case 'HOST':
                                    content = `<p>名称 ：${params.data.name}</p>
                                               <p>报警状态 ：${params.data.alarmStatus != '2' ? '警告' : '正常'}</p>`
                                    break;
                                default :
                                    content = `<p>名称：${params.data.name}</p>`
                            }
                            return content;
                        },
                        textStyle:{
                            color:'#333333'
                        }
                    },
                    grid:{
                     left:'20%'
                    },
                    series: [
                        {
                            type: 'tree',
                            data: [chartData],
                            top: '8%',
                            left: '8%',
                            bottom: '10%',
                            right: '5%',
                            // orient: 'vertical',
                            symbol : `image://${vdcPng}`,
                            symbolSize:80,
                            initialTreeDepth: 3,
                            label: {
                                normal: {
                                    position: 'bottom',
                                    verticalAlign: 'middle',
                                    align: 'center',
                                    distance:10,
                                    fontSize: 12,
                                    color:'#333333'
                                }
                            }
                        }
                    ]
                }
                myChart.setOption(option,true)
                EleResize.on(domId,() => {
                    myChart.resize()
                })
            },
            traverseTree(node){
                if(!node){
                    return;
                }
                if (node.children && node.children.length > 0) {
                    for (let i = 0; i < node.children.length; i++) {
                        switch(node.children[i].assetType){
                            case this.$constant.Asset_Type.VPC:
                                node.children[i].symbol = `image://${vpcPng}`
                                node.children[i].symbolSize = 48
                                this.vpcCount = this.vpcCount + 1
                                break;
                            case this.$constant.Asset_Type.SUBNET:
                                node.children[i].symbol = `image://${subnetPng}`
                                node.children[i].symbolSize = 32
                                node.children[i].label = {
                                    position:'left',
                                    align: 'right'
                                }
                                this.subnetCount = this.subnetCount + 1
                                break;
                            case this.$constant.Asset_Type.HOST:
                                if(node.children[i].alarmStatus != '2'){
                                    node.children[i].symbol = `image://${vhostRedPng}`
                                }else{
                                    node.children[i].symbol = `image://${vhostPng}`
                                }
                                node.children[i].symbolSize = 24
                                node.children[i].label = {
                                    position:'left',
                                    align: 'right'
                                }
                                this.hostCount = this.hostCount + 1
                                break;
                        }
                        this.traverseTree(node.children[i]);
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .el-card__body {
        padding: 10px;
    }
    .statistics-title{
        color: #FFFFFF;
        font-size: 14px;
    }
    .bar-content{
        padding: 20px 0;
    }
    .bar-content .el-col:first-child{
        padding-left: 0 !important;
    }
    .bar-content .el-col:last-child{
        padding-right: 0 !important;
    }
    .capity-content{
        padding-left: 0 !important;
        padding-right: 0 !important;
    }
    .tab-vdc-list{
        padding: 10px 20px 0;
    }
    .el-card {
        text-align: center;
        color: #FFFFFF;
    }
    .el-card .fa{
        font-size: 32px;
        margin-bottom: 5px;
    }
    .bar-list{
        margin-bottom: 10px;
        padding-right: 20px !important;
    }
    .icon_img{
        height: 36px;
    }
    .tooltip-content{
        color: #333333;
    }
</style>