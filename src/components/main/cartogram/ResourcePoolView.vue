<template>
    <div class="operation-main-content">
        <!-- 导向 -->
        <div class="nav-title">
            <nav-title :titles="['运维中心','视图管理','虚拟逻辑视图']"></nav-title>
        </div>
        <!-- 主体 -->
        <div class="main-content">
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="tab-resourcePool-list">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane v-for="(item,i) in resourcePoolList"
                                         :key="item.platfromType+'_'+i" :name="item.resourcePoolId">
                                <span slot="label">
                                    <span :data-type="item.platformType"
                                             class="label-content">
                                    </span>
                                    {{ item.name }}
                                </span>
                            </el-tab-pane>

                        </el-tabs>
                    </div>
                </el-col>
                <el-col :span="24" class="capacity-content">
                    <el-row :gutter="10" style="margin-left: 10px;margin-right: 10px;">
                        <el-col :span="24" class="card-margin" v-if="platformType != 3">
                            <el-col :span="8" v-for="(item,index) in cardList"
                                    :key="index">
                                <el-card shadow="never"
                                         :style="{backgroundColor:colorPalette[index],width: '100%',borderRadius:0}">
                                    <el-col :span="12" class="card-main-content">
                                        <view-pie :id="item.id" :unit="item.unit" :pieData="item.pieData"></view-pie>
                                    </el-col>
                                    <el-col :span="12" class="card-main-content">
                                        <div class="legend-monitor-info">
                                            <p>
                                                <span class="bg_color1 bg_color"></span>
                                                <span id="totalDisk">{{ item.total }}</span>
                                            </p>
                                            <P class="monitor-item-value">
                                                {{ item.label }}总量({{ item.unit }})
                                            </P>
                                        </div>
                                        <div class="legend-monitor-info">
                                            <p>
                                                <span class="bg_color2 bg_color"></span>
                                                <span id="usedDisk">{{ item.pieData[0].value }}</span>
                                            </p>
                                            <P class="monitor-item-value">
                                                {{ item.label }}已用量({{ item.unit }})
                                            </P>
                                        </div>
                                        <div class="legend-monitor-info">
                                            <p>
                                                <span class="bg_color3 bg_color"></span>
                                                <span id="freeDisk">{{ item.pieData[1].value }}</span>
                                            </p>
                                            <P class="monitor-item-value">
                                                {{ item.label }}可用量({{ item.unit }})
                                            </P>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <p class="statistics-title">{{ item.label }}({{ item.unit }})</p>
                                    </el-col>
                                </el-card>
                            </el-col>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="24">
                    <el-row :gutter="10">
                        <el-col :span="16" class="tree-content">
                            <!-- 视图 -->
                            <div class="view-content">
                                <div id="resourcePool-view" style="width: 100%;height: 610px;margin: 0 auto;"></div>
                            </div>
                        </el-col>
                        <el-col :span="8" style="padding-left: 0;padding-right: 20px;">
                            <el-col class="bar-content" :span="24">
                                <el-col :span="24" v-for="(item,subIndex) in barList" :key="item.id+'_'+subIndex" style="padding-left: 0;margin-bottom: 10px;">
                                    <view-bar id="item.id"
                                              :barData="item.barData"
                                              :title="item.title"
                                              :bgColor="item.bgColor">
                                    </view-bar>
                                </el-col>
                            </el-col>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import NavTitle from '@/components/common/NavTitle'
    import ViewPie from '@/components/common/ViewPie'
    import ViewBar from '@/components/common/ViewBar'
    import { EleResize } from '@/utils/resize.js'
    //资源池图片
    import resourcePoolPng from '@/assets/images/resourcePool.png'
    //物理机（宿主机）图片
    import hostDefaultPng from '@/assets/images/hostComputerDefault.png'
    import hostRedAlarm from '@/assets/images/hostRedAlarm.png'
    //虚拟机图片
    import vmDefault from '@/assets/images/vmDefault.png'
    import vmRedAlarm from '@/assets/images/vmRedAlarm.png'

    export default {
        name: "",
        data() {
            return {
                activeName:'0',
                resourcePoolId:'',
                resourcePoolList:[],
                isActive:0,
                treeData:{},
                colorPalette : ['#5ab1ef','#b6a2de','#2ec7c9','#d87a80','#ffb980'],
                platformType:'1',
                resourcePoolData:{},
            }
        },
        computed:{
            cardList(){
                return [{
                    id:'storage-echarts',
                    label:'存储',
                    unit:'GB',
                    total:this.resourcePoolData.totalDisk,
                    pieData:[{
                        name:'已使用',
                        value:this.resourcePoolData.usedDisk,
                        label: {
                            normal:{
                                show:true,
                                textStyle: {
                                    fontSize: '14',
                                    fontWeight: 'normal',
                                    color:'#FFFFFF'
                                }
                            }
                        }
                    },{
                        name:'未使用',
                        value:this.resourcePoolData.freeDisk
                    }]
                },{
                    id:'message-echarts',
                    label:'内存',
                    unit:'GB',
                    total:this.resourcePoolData.totalMemory,
                    pieData:[{
                        name:'已使用',
                        value:this.resourcePoolData.usedMemory,
                        label: {
                            normal:{
                                show:true,
                                textStyle: {
                                    fontSize: '14',
                                    fontWeight: 'normal',
                                    color:'#FFFFFF'
                                }
                            }
                        }
                    },{
                        name:'未使用',
                        value:this.resourcePoolData.freeMemory
                    }]
                },{
                    id:'cpu-echarts',
                    label:'CPU',
                    unit:'核',
                    total:this.resourcePoolData.totalVcpu,
                    pieData:[{
                        name:'已使用',
                        value:this.resourcePoolData.usedVcpu,
                        label: {
                            normal:{
                                show:true,
                                textStyle: {
                                    fontSize: '14',
                                    fontWeight: 'normal',
                                    color:'#FFFFFF'
                                }
                            }
                        }
                    },{
                        name:'未使用',
                        value:this.resourcePoolData.freeVcpu
                    }]
                }]
            },
            barList(){
                return [{
                    id:'computing-service-echarts',
                    label:'计算服务',
                    title:'资源--计算服务',
                    bgColor:'rgba(150, 141, 155, 0.1)',
                    barData:[{
                        name:'云主机',
                        value:this.resourcePoolData.hostCount
                    },{
                        name:'云硬盘',
                        value:this.resourcePoolData.diskCount
                    },{
                        name:'硬盘快照',
                        value:this.resourcePoolData.diskSnapshotCount
                    },{
                        name:'SSH密钥',
                        value:this.resourcePoolData.keyPairCount
                    },{
                        name:'安全组',
                        value:this.resourcePoolData.securityGroupCount
                    }]
                },{
                    id:'network-service-echarts',
                    label:'网络服务',
                    title:'资源--网络服务',
                    bgColor:'rgba(150, 141, 155, 0.1)',
                    barData:[{
                        name:'VPC',
                        value:this.resourcePoolData.vpcCount
                    },{
                        name:'公网IP',
                        value:this.resourcePoolData.floatingIpCount
                    },{
                        name:'防火墙',
                        value:this.resourcePoolData.diskSnapshotCount
                    },{
                        name:'负载均衡',
                        value:this.resourcePoolData.loadBalancerCount
                    }]
                }]
            },
            consoleUrl(){
                return sessionStorage.getItem(this.$constant.APP_KEY.console)
            },
            operationUrl(){
                return sessionStorage.getItem(this.$constant.APP_KEY.operation)
            },
        },
        components:{
            NavTitle,
            ViewPie,
            ViewBar
        },
        watch:{
            activeName(){
                this.$nextTick(() => {
                    if(this.activeName){
                        this.getTreeData(this.activeName)
                        this.getResourcePoolMonitor(this.activeName)
                    }
                })
            }
        },
        mounted(){
            this.getResourcePoolList()
            this.traverseTree(this.testData)
        },
        methods:{
            handleClick(tab,event){
                this.platformType = event.target.getElementsByClassName('label-content')[0].getAttribute('data-type')
            },
            getResourcePoolList(){
                this.$https.get(`${this.consoleUrl}/resourcePool/list`,{
                    status:this.$constant.PUBLISH_STATUS.yes
                })
                    .then(res => {
                        if(res.code == this.$constant.SUCCESS_CODE){
                            this.resourcePoolList = res.result.list
                            this.activeName = this.resourcePoolList[0].resourcePoolId
                            this.platformType = this.resourcePoolList[0].platformType
                        }else{
                            this.$message.error(res.msg)
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            getTreeData(assetId){
                this.$https.get(`${this.operationUrl}/topologicalGraph/query`,{
                    assetId:assetId
                })
                    .then(res => {
                        if(res.code == this.$constant.SUCCESS_CODE){
                            if(res.result != null){
                                this.treeData = res.result
                            }else{
                                this.treeData = {}
                            }
                            this.initTreeGraph(this.treeData)
                        }else{
                            this.$message.error(res.msg)
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            initTreeGraph(tree){
                let domId = document.getElementById('resourcePool-view')
                let treeChart = this.$echarts.init(domId)
                // tree = {
                //     name:'万达信息云资源池',
                //     assetType:'RESOURCE_POOL',
                //     children:[{
                //         name:'计算节点01',
                //         assetType:'PHYSICAL_HOST',
                //         alarmStatus:'2',
                //         children:[{
                //             name:'虚拟机01',
                //             alarmStatus:'2',
                //             assetType:'HOST'
                //         },{
                //             name:'虚拟机02',
                //             alarmStatus:'1',
                //             assetType:'HOST'
                //         },{
                //             name:'虚拟机03',
                //             alarmStatus:'2',
                //             assetType:'HOST'
                //         },{
                //             name:'虚拟机04',
                //             alarmStatus:'1',
                //             assetType:'HOST'
                //         },{
                //             name:'虚拟机05',
                //             alarmStatus:'2',
                //             assetType:'HOST'
                //         },{
                //             name:'虚拟机06',
                //             alarmStatus:'2',
                //             assetType:'HOST'
                //         },{
                //             name:'虚拟机07',
                //             alarmStatus:'2',
                //             assetType:'HOST'
                //         },{
                //             name:'虚拟机08',
                //             alarmStatus:'2',
                //             assetType:'HOST'
                //         },{
                //             name:'虚拟机09',
                //             alarmStatus:'2',
                //             assetType:'HOST'
                //         },{
                //             name:'虚拟机10',
                //             alarmStatus:'2',
                //             assetType:'HOST'
                //         }]
                //     },{
                //         name:'计算节点02',
                //         assetType:'PHYSICAL_HOST',
                //         alarmStatus:'2',
                //         children:[{
                //             name:'虚拟机01',
                //             alarmStatus:'2',
                //             assetType:'HOST'
                //         },{
                //             name:'虚拟机02',
                //             alarmStatus:'1',
                //             assetType:'HOST'
                //         },{
                //             name:'虚拟机03',
                //             alarmStatus:'2',
                //             assetType:'HOST'
                //         },{
                //             name:'虚拟机04',
                //             alarmStatus:'1',
                //             assetType:'HOST'
                //         },{
                //             name:'虚拟机05',
                //             alarmStatus:'2',
                //             assetType:'HOST'
                //         }]
                //     },{
                //         name:'计算节点03',
                //         alarmStatus:'1',
                //         assetType:'PHYSICAL_HOST'
                //     },{
                //         name:'计算节点04',
                //         alarmStatus:'2',
                //         assetType:'PHYSICAL_HOST'
                //     }]
                // }
                this.traverseTree(tree)
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
                                case 'PHYSICAL_HOST':
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
                    series: [
                        {
                            type: 'tree',
                            data: [tree],
                            top: '15%',
                            bottom: '15%',
                            layout: 'radial',
                            symbol:`image://${resourcePoolPng}`,
                            symbolSize:50,
                            initialTreeDepth: 2,
                            animationDuration: 2000,
                            animationDurationUpdate: 2000
                        }
                    ]
                }
                treeChart.setOption(option,true)
                EleResize.on(domId, () => {
                    treeChart.resize()
                })
            },
            traverseTree(node){
                if(!node){
                    return;
                }
                if (node.children && node.children.length > 0) {
                    for (let i = 0; i < node.children.length; i++) {
                        if(node.children[i].assetType == this.$constant.Asset_Type.HOST){
                            // node.children[i].label = {
                            //     show:false
                            // }
                            switch(node.children[i].alarmStatus){
                                case '1':
                                    node.children[i].symbol = `image://${vmRedAlarm}`
                                    node.children[i].label = {
                                        color:'#FF0000'
                                    }
                                    break;
                                case '2':
                                    node.children[i].symbol = `image://${vmDefault}`
                                    break;
                                default:
                                    node.children[i].symbol = `image://${vmDefault}`
                            }
                        }else if(node.children[i].assetType == this.$constant.Asset_Type.PHYSICAL_HOST){
                            switch(node.children[i].alarmStatus){
                                case '1':
                                    node.children[i].symbol = `image://${hostRedAlarm}`
                                    break;
                                case '2':
                                    node.children[i].symbol = `image://${hostDefaultPng}`
                                    break;
                                default:
                                    node.children[i].symbol = `image://${hostDefaultPng}`
                            }
                        }
                        node.children[i].symbolSize = 32
                        this.traverseTree(node.children[i]);
                    }
                }
            },
            getResourcePoolMonitor(poolId){
                this.$https.get(`${this.consoleUrl}/resourcePoolData/usage`,{
                    resourcePoolId:poolId
                })
                    .then(res => {
                        if(res.code == this.$constant.SUCCESS_CODE){
                            this.resourcePoolData = res.result
                        }
                    })
            }
        }
    }
</script>

<style scoped>
    .view-content{
        margin-bottom: 10px;
    }
    .tree-content{
        padding-left: 25px !important;
        padding-right: 11px !important;
    }
    .el-button{
        width: 98%;
        padding: 0;
        height: 30px;
        margin-bottom: 8px;
        border: none;
        border-radius: 0;
        box-shadow: 0 10px 10px rgba(0,0,0,0.1);
        font-size: 12px;
    }
    .el-button:hover{
        transform: scale(1.1);
        border: 1px solid #2090ff;
    }
    .el-button.isActive,.el-button:focus{
        color: #FFFFFF !important;
        background-color: #2090ff;
        width: 100%;
    }
    .resourcePool-list-content{
        padding: 20px 0  20px 20px;
        background-color: #FFFFFF;
        height: 508px;
        overflow-x: hidden;
        overflow-y: auto;
        text-align: center;
    }
    .card-margin{
        margin-bottom: 12px;
    }
    .bar-content{
        padding-left: 0 !important;
        padding-right: 0 !important;
    }
    .card-main-content{
        height: 150px;
    }
    .statistics-title{
        color: #FFFFFF;
        font-size:12px;
        text-align: center;
        padding-bottom: 10px;
    }
    .bg_color{
        width: 12px;
        height: 12px;
        display: inline-block;
        margin-right: 10px;
    }
    .bg_color1{
        background-color: #80e1ef;
    }
    .bg_color2{
        background-color:#FF9900;
    }
    .bg_color3{
        background-color: #5cb85c;
    }
    .legend-monitor-info{
        color: #FFFFFF;
        font-size: 12px;
    }
    .legend-monitor-info p{
        margin-bottom: 10px;
    }
    .resourcePool-view-content{
        padding-left: 10px;
    }
    .tab-resourcePool-list{
        padding: 10px 20px 0;
    }
    .capacity-content{
        padding: 0 10px;
    }
</style>