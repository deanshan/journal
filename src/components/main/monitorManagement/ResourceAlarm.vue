<template>
    <div class="operation-main-content">
        <!-- 导向 -->
            <NavTitle :titles="['运维中心', '监控中心', '资源报警']"></NavTitle>
        <!-- 主体 -->
        <div class="main-content">
            <!-- 查询 -->
            <div class="search-content">
                <el-button type="default" icon="fa fa-refresh" @click="tableRefresh()" class="btn-refresh"></el-button>
                <el-form :inline="true" :model="alarmInfo" class="demo-form-inline">
                    <el-form-item>
                        <el-select placeholder="时间范围查询" v-model="alarmInfo.queryTimeFlag" size="small">
                            <el-option label="近一小时" value="0"></el-option>
                            <el-option label="近一天" value="1"></el-option>
                            <el-option label="近一周" value="2"></el-option>
                            <el-option label="近一月" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select placeholder="资源类型" v-model="alarmInfo.resourceType" size="small">
                            <el-option label="云主机" value="10"></el-option>
                            <el-option label="宿主机" value="16"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select placeholder="确认状态" v-model="alarmInfo.isConfirmed" size="small">
                            <el-option label="已确认" value="0"></el-option>
                            <el-option label="未确认" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="small" class="btn-line-height">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 表格 -->
            <div class="table-content">
                <base-table :tableData="tableData"
                            :itemData="itemData"
                            :operationData="operationData"
                            :total="totalNum"
                            :url="url"
                            ref="baseTableData"
                            :loading="loading"
                ></base-table>
            </div>
        </div>
    </div>
</template>

<script>
    import NavTitle from '@/components/common/NavTitle'
    import BaseTable from '@/components/common/table/BaseTable'
    export default {
        name: "resourceAlarm",
        data(){
            return {
                loading:true,
                url:sessionStorage.getItem(this.$constant.APP_KEY.monitor)+`/alarm/page`,
                alarmInfo:{
                    resourceType:'',
                    resourcePoolId:'',
                    alarmLevel: '',
                    queryTimeFlag:'',
                    projectId:'',
                    isConfirmed:''
                },
                tableData:[],
                totalNum:1,
                itemData:[{
                    prop:"resourceName",
                    label:"资源名称",
                    width:'200'
                },{
                    prop:"resourceType",
                    label:"资源类型",
                    width:'100'
                },{
                    prop:"alarmDetail",
                    label:"报警详情",
                    width:'200'
                },{
                    prop:"address",
                    label:"IP地址",
                    width:'100'
                },{
                    prop:"resourcePoolName",
                    label:"所属资源池",
                    width:'100'
                },{
                    prop:"alarmTime",
                    label:"报警时间",
                    width:'200'
                },{
                    prop:"isConfirmed",
                    label:"确认状态",
                    width:'100',
                    className: 'className'
                }],
                operationData:[{
                    prop:"alarmRecordId",
                    label:"操作",
                    width:'100',
                    list:[{
                        name:"详情",
                        type: 'detail',
                        textClass:"text-operation"
                    }]
                }]
            }
        },
        components:{
            NavTitle,
            BaseTable
        },
        computed:{
            monitorUrl(){
                return sessionStorage.getItem(this.$constant.APP_KEY.monitor)
            },
        },
        mounted(){
            this.getDataList(this.$refs.baseTableData.currentPage)
        },
        methods:{
            getDataList(val){
                this.loading=true
                this.$https.get(`${this.monitorUrl}/alarm/page`,{
                        page:val,
                        rows:this.$refs.baseTableData.pageSize,
                        resourceType:this.alarmInfo.resourceType,
                        alarmLevel:this.alarmInfo.alarmLevel,
                        queryTimeFlag:this.alarmInfo.queryTimeFlag,
                        isConfirmed: this.alarmInfo.isConfirmed,
                    })
                    .then((res) => {
                        this.loading=false
                        if(res.code === this.$constant.SUCCESS_CODE){
                            this.tableData = res.result.pageInfo.list
                            this.totalNum = res.result.pageInfo.total
                            for(let data of Object.values(this.tableData)){
                                data.resourceType = this.$conversionType('resource_type', data.resourceType)
                                data['className'] = this.$getStatusStyle('MONITOR_ALARM_STATUS',data.isConfirmed)
                                data.isConfirmed = this.$conversionType(this.$constant['MONITOR_ALARM_STATUS'], data.isConfirmed)
                            }
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    }).catch(error => {
                    this.loading=false
                })
            },
            onSubmit(){
                this.getDataList(this.$refs.baseTableData.currentPage)
            },
            tableRefresh(){
                this.alarmInfo.resourceType = ""
                this.alarmInfo.alarmLevel = ""
                this.alarmInfo.queryTimeFlag = ""
                this.alarmInfo.projectId = ""
                this.alarmInfo.isConfirmed = ""
                this.$refs.baseTableData.currentPage = 1
                this.getDataList(this.$refs.baseTableData.currentPage)
            },
            gotoResourceDetailPage(type,obj){
                this.$router.push({
                    name:'resourceAlarmDetail',
                    params:{
                        alarmRecordId:obj.alarmRecordId

                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
.search-content{
    display: flex;
    justify-content: space-between;
    padding: 20px 20px 10px 20px;
}
</style>