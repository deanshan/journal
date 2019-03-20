<template>
    <div class="operation-main-content">
        <!-- 导向 -->
        <nav-title :titles="['运维中心', '视图管理', '物理位置视图']"></nav-title>
        <!-- 主体 -->
        <div class="datacenter-view-content">
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="tab-vdc-list">
                        <el-tabs v-model="activeName">
                            <el-tab-pane v-for="(item,index) in datacenterList"
                                         :key="index"
                                         :label="item.name"
                                         :name="item.datacenterId">
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>
                <!--<el-col :span="4" class="datacenter-list-content">-->
                    <!--<el-col :span="20" :offset="2" v-for="(item,index) in datacenterList" :key="index">-->
                        <!--<el-button :class="{isSelected:index==isSelected}"-->
                                   <!--@click="toggleSelected(item.datacenterId,index)">{{item.name}}</el-button>-->
                    <!--</el-col>-->
                <!--</el-col>-->
                <el-col :span="24">
                    <el-row :gutter="10">
                        <el-col :span="24">
                            <el-col :span="4" v-for="(item,index) in serviceCountList.list"
                                    :key="index" >
                                <el-card shadow="never"
                                         :style="{backgroundColor:colorPalette[index],borderRadius:0}">
                                    <p :class="item.icon"></p>
                                    <p class="service-title">{{ item.name }} : {{ item.count }}</p>
                                </el-card>
                            </el-col>
                        </el-col>
                        <el-col :span="24">
                            <div class="view-content">
                                <div id="datacenter-view" style="width:98%;height:500px;margin: 0 20px"></div>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import NavTitle from '@/components/common/NavTitle'
    import { EleResize } from '@/utils/resize.js'
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入树图组件
    require('echarts/lib/chart/tree')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    //引入图片
    import datacenterPng from '@/assets/images/datacenter.png'
    import computerRoomPng from '@/assets/images/computerRoom.png'
    import cabinetPng from '@/assets/images/cabinet.png'
    import serverPng from '@/assets/images/server.png'
    import storagePng from '@/assets/images/storage.png'
    import networkPng from '@/assets/images/network.png'
    import peripheralPng from '@/assets/images/peripheral.png'
    import securityPng from '@/assets/images/security.png'

    export default {
        name: "dataCenterView",
        data() {
            return {
                activeName:'0',
                datacenterList:[],
                chartData:{},
                colorPalette : ['#5ab1ef','#b6a2de','#2ec7c9','#d87a80','#ffb980', '#8d98b3','#e5cf0d'],
                datacenterId:'',
                isSelected:0,
                sessionId:'',
                cabinetCount:0,
                serverCount:0,
                storageCount:0,
                networkCount:0,
                securityCount:0,
                peripheralCount:0,
                itamUrl:sessionStorage.getItem(this.$constant.APP_KEY.itam)
            }
        },
        computed:{
            chartOption(){
                return {}
            },
            serviceCountList(){
                return {
                    list:[{
                        name:'计算设备',
                        icon:'fa fa-server',
                        count:this.serverCount
                    },{
                        name:'存储设备',
                        icon:'fa fa-database',
                        count:this.storageCount
                    },{
                        name:'网络设备',
                        icon:'fa fa-globe',
                        count:this.networkCount
                    },{
                        name:'安全设备',
                        icon:'fa fa-shield',
                        count:this.securityCount
                    },{
                        name:'外设设备',
                        icon:'fa fa-hdd-o',
                        count:this.peripheralCount
                    },{
                        name:'机柜',
                        icon:'fa fa-microchip',
                        count:this.cabinetCount
                    }]
                }
            },

            operationUrl(){
                return sessionStorage.getItem(this.$constant.APP_KEY.operation)
            }
        },
        watch:{
            activeName(){
                this.$nextTick(() => {
                    if(this.activeName){
                        this.getViewData(this.activeName)
                    }
                })
            }
        },
        components:{
            NavTitle
        },
        mounted(){
            console.log('itamUrl = ' + this.itamUrl)
            if(this.itamUrl != null){
                this.getDatacenterList()
            }else{
                this.$https.get('/app/getByAppKey',{
                    appKey:this.$constant.APP_KEY.itam
                })
                    .then(res => {
                        this.itamUrl = res.ipAddress
                        sessionStorage.setItem(`${this.$constant.APP_KEY.itam}`, res.ipAddress)
                        this.getDatacenterList()
                    })
            }
        },
        methods:{
            // toggleSelected(id,index){
            //     this.datacenterId = id
            //     this.isSelected = index
            // },
            getDatacenterList(){
                this.$https
                    .get(`${this.itamUrl}/datacenter/list`)
                    .then(res => {
                        if(res.code == this.$constant.SUCCESS_CODE){
                            this.datacenterList = res.result.list
                            this.activeName=this.datacenterList[0].datacenterId
                        }else{
                            this.$message.error(res.msg)
                        }
                    })
            },
            getViewData(assetId){
                this.$https
                    .get(`${this.operationUrl}/topologicalGraph/query`,{
                        assetId: assetId
                    })
                    .then(res => {
                        if(res.code == this.$constant.SUCCESS_CODE){
                            if(res.result != null){
                                this.chartData = res.result
                            }else{
                                this.chartData = {}
                            }
                            this.initTreeChart(this.chartData)
                        }else{
                            this.$message.error(res.msg)
                        }
                    })
            },
            initTreeChart(chart){
                let domId = document.getElementById('datacenter-view')
                let myChart = echarts.init(domId)
                this.cabinetCount = 0
                this.serverCount = 0
                this.storageCount = 0
                this.networkCount = 0
                this.securityCount = 0
                this.peripheralCount = 0
                this.traverseTree(chart)
                let option = {
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove'
                    },
                    series: [
                        {
                            type: 'tree',
                            data: [chart],

                            top: '8%',
                            left: '8%',
                            bottom: '10%',
                            right: '5%',
                            orient: 'vertical',
                            symbol : `image://${datacenterPng}`,
                            symbolSize:64,
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
                            },
                            animationType:"left",
                            animationEasing:'elasticOut',
                            animationDurationUpdate:1000,
                            animationDuration:2000
                        }
                    ]
                }
                myChart.setOption(option,true)
                EleResize.on(domId, () => {
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
                            case this.$constant.Asset_Type.COMPUTER_ROOM:
                                node.children[i].symbol = `image://${computerRoomPng}`
                                node.children[i].symbolSize = 64
                                break;
                            case this.$constant.Asset_Type.CABINET:
                                this.cabinetCount = this.cabinetCount + 1
                                node.children[i].symbol = `image://${cabinetPng}`
                                node.children[i].label = {
                                    color: this.colorPalette[5]
                                }
                                break;
                            case this.$constant.Asset_Type.NETWORK_DEVICE:
                                this.networkCount = this.networkCount + 1
                                node.children[i].symbol = `image://${networkPng}`
                                node.children[i].label = {
                                    color: this.colorPalette[2]
                                }
                                break;
                            case this.$constant.Asset_Type.PERIPHERAL_DEVICE:
                                this.peripheralCount = this.peripheralCount + 1
                                node.children[i].symbol = `image://${peripheralPng}`
                                node.children[i].label = {
                                    color: this.colorPalette[4]
                                }
                                break;
                            case this.$constant.Asset_Type.SECURITY_DEVICE:
                                this.securityCount = this.securityCount + 1
                                node.children[i].symbol = `image://${securityPng}`
                                node.children[i].label = {
                                    color: this.colorPalette[3]
                                }
                                break;
                            case this.$constant.Asset_Type.SERVER_DEVICE:
                                this.serverCount = this.serverCount + 1
                                node.children[i].symbol = `image://${serverPng}`
                                node.children[i].label = {
                                    color: this.colorPalette[0]
                                }
                                break;
                            case this.$constant.Asset_Type.STORAGE_DEVICE:
                                this.storageCount = this.storageCount + 1
                                node.children[i].symbol = `image://${storagePng}`
                                node.children[i].label = {
                                    color: this.colorPalette[1]
                                }
                                break
                        }
                        node.children[i].symbolSize = 32
                        this.traverseTree(node.children[i]);
                    }
                }
            }
        }
    }
</script>


<style scoped>
    .view-content{
        background-color: #FFFFFF;
        margin: 10px 3px;
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
    .el-button:hover,.el-button:focus{
        transform: scale(1.1);
        border: 1px solid #2090ff;
    }
    .isSelected{
        color: #FFFFFF;
        background-color: #2090ff;
        width: 100%;
    }
    .datacenter-list-content{
        padding: 20px 0  20px 20px;
        background-color: #FFFFFF;
        height: 603px;
        overflow-x: hidden;
        overflow-y: auto;
        text-align: center;
    }
    .datacenter-view-content{
        padding-left: 10px;
        background-color: #FFFFFF;
    }
    .el-card {
        text-align: center;
        color: #FFFFFF;
    }
    .el-card .fa{
        font-size: 32px;
        margin-bottom: 5px;
    }
    .el-card .service-title{
        font-size: 14px;
    }
    .tab-vdc-list{
        padding: 10px 10px 0;
    }
</style>