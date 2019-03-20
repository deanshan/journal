<template>
    <div class="operation-main-content">
        <!-- 导向 -->
        <NavTitle :titles="['运维中心', '监控中心', '资源监控']"></NavTitle>
        <!-- 主体 -->
        <div class="main-content">
            <!-- 查询 -->
            <div class="search-content">
                <el-button type="default" icon="fa fa-refresh" @click="tableRefresh" class="btn-refresh"></el-button>
                <el-form :inline="true" :model="monitorData" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="monitorData.name" placeholder="请输入资源名称" size="small">
                            <template slot="prepend">资源名称</template>
                        </el-input>
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
                            :loading="loading"
                            ref="baseTableData">
                </base-table>
            </div>
        </div>
    </div>
</template>

<script>
    import NavTitle from '@/components/common/NavTitle'
    import BaseTable from '@/components/common/table/BaseTable'

    export default {
        name: "resourceMonitor",
        data() {
            return {
                url:sessionStorage.getItem(this.$constant.APP_KEY.monitor)+`/host/page`,
                monitorData:{
                    name:'',
                    resourceType:'',
                    resourcePoolId: ''
                },
                tableData:[],
                totalNum:1,
                itemData:[{
                    prop:"warnType",
                    label:"告警状态",
                    width:'100',
                    classIcon: 'classIcon',
                    hidden:'hidden'
                },{
                    prop:"name",
                    label:"资源名称",
                    width:'150'
                },{
                    prop:"resourceType",
                    label:"资源类型",
                    width:'150'
                },{
                    prop:"internalIp",
                    label:"IP地址",
                    width:'150'
                },{
                    prop:"cupUsage",
                    label:"cpu利用率",
                    width:'100'
                },{
                    prop:"memoryUsage",
                    label:"内存利用率",
                    width:'100'
                },{
                    prop:"status",
                    label:"状态",
                    width:'100',
                    className:'className'
                }],
                operationData:[{
                    prop:"bottomHostId",
                    label:"操作",
                    width:'100',
                    list:[{
                        name:"详情",
                        type: 'detail',
                        textClass:"text-operation"
                    }]
                }],
                loading:true
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
                this.loading = true
                this.$https.get(`${this.monitorUrl}/host/page` ,{
                        page:val,
                        rows:this.$refs.baseTableData.pageSize,
                        name: this.monitorData.name,
                    })
                    .then(res => {
                        console.log("结果："+JSON.stringify(res))
                        this.loading = false

                        if(res.code === this.$constant['SUCCESS_CODE']){
                            //alert(JSON.stringify(res));
                            this.tableData = res.result.list
                            this.tableData.forEach(table => {
                                table.resourceType="10"
                               if(table.cupUsage != null && table.cupUsage != ""){
                                   table.cupUsage = table.cupUsage+"%";
                               }else{
                                   table.cupUsage = "--"
                               }
                               if(table.memoryUsage != null && table.memoryUsage != ""){
                                   table.memoryUsage = table.memoryUsage+"%"
                               }else{
                                   table.memoryUsage = "--"
                               }
                            })
                            this.totalNum = res.result.total
                            for(let data of Object.values(this.tableData)) {
                                data['className'] = this.$getStatusStyle('HOST_STATUS',data.status)
                                data.status = this.$conversionType('host_status', data.status)
                                data.resourceType = this.$conversionType('resource_type',data.resourceType)
                                if(data['warnType'] == '2'){
                                    data['classIcon'] = 'fa fa-bell bell-green'
                                }else{
                                    data['classIcon'] = 'fa fa-bell bell-red'
                                }
                                data['hidden'] = true
                            }
                        }else{
                            this.$message.error(res.msg)
                        }
                    })
            },

            tableRefresh(){
                this.monitorData.name = ""
                this.$refs.baseTableData.currentPage = 1
                this.getDataList(this.$refs.baseTableData.currentPage)
            },
            onSubmit(){
                this.getDataList(this.$refs.baseTableData.currentPage)
            },
            gotoResourceDetailPage(type,obj){
                this.$router.push({
                    name:'monitorResourceDetailView',
                    params:{
                        resourceId:obj.hostId,
                        resourceType:obj.resourceType

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