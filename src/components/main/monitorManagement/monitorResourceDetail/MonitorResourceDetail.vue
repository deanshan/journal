<template>
    <div class="operation-main-content">
        <!-- 导向 -->
        <div class="nav-title">
            <nav-title :titles="['运维中心','监控中心','资源监控','详情']" :isReply=true></nav-title>
        </div>
        <!-- 主体 -->
        <div class="main-content">
            <div class="card-list itemTitle info-monitors monitor-item">
                <el-row :gutter="12">
                    <el-col class="bar-content" :span="24">
                        <el-col :span="12" v-for="(item,subIndex) in itemList" :key="item.monitorItemId+'_'+subIndex">
                            <span>{{ item.name+item.unit }}</span>
                            <view-line id="item.monitorItemId" :lineData="monitorResourceData"></view-line>
                        </el-col>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import navTitle from '@/components/common/NavTitle'
    import ViewLine from '@/components/common/ViewLine'
    export default {
        name: "monitorResourceDetailView",
        data(){
                return {
                    monitorItemId:'',
                    xdata:[],
                    ydata:[],
                    itemList:{},
                    monitorResourceList:[],
                    activeName:'0',
                    monitorResourceData:{},
                    colorArr:['#5ab1ef','#b6a2de','#2ec7c9','#d87a80','#ffb980',
                        '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
                        '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
                        '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
                    ],
                }
        },
        watch:{

        },
        components:{
            navTitle,
            ViewLine
        },
        computed:{
            monitorUrl(){
                return sessionStorage.getItem(this.$constant.APP_KEY.monitor)
            },

        },
        mounted(){
            this.getItemList()
            this.getMonitorResource()
            this.assembleData()
        },
        methods:{
            getItemList(){
                this.$https.get(`${this.monitorUrl}/item/list`,{
                        resourceType:10
                }).then(res => {
                        if(res.code == this.$constant.SUCCESS_CODE){
                            this.itemList = res.result.list
                        }
                    })
            },
            getMonitorResource(){
                this.$https.get(`${this.monitorUrl}/monitor/data`,{
                        resourceId:this.$route.params.resourceId,
                        resourceType:10
                })
                    .then(res => {
                        if(res.code == this.$constant.SUCCESS_CODE){
                            console.log("详情数据："+JSON.stringify(res))
                            this.monitorResourceData = res.result
                        }
                        this.itemList.forEach(item => {
                            let itemKey = item.itemKey;
                            this.monitorItemId = item.monitorItemId;
                            this.assembleData(this.resourceId,itemKey,this.monitorResourceData,this.xdata,this.ydata);
                        })
                    })
            },
            assembleData(resourceId,key,monitorResourceData,xdata,ydata){
                if(this.monitorResourceData.length > 0 ){
                    this.monitorResourceData.forEach((index,data) => {
                        if(key == data[index].itemKey) {
                            xdata.push(data[index].generateTime);
                            ydata.push(data[index].value);
                        }
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .info-monitors{
        padding:0 4%;
    }
    .info-monitors a{
        color:#2090ff;
    }
    .monitor-item{
        padding-top:20px;
    }
    .itemTitle{
        color: #333333;
        font-size: 14px;
    }
    .nData{
        padding-top: 88px;
        padding-left: 30px;
        font-size: 14px;
        color: #999999;
    }

</style>