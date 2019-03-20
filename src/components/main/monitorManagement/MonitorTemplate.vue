<template>
    <div class="operation-main-content">
        <!-- 导向 -->
        <NavTitle :titles="['运维中心', '监控中心', '监控模板']"></NavTitle>
        <!-- 主体 -->
        <div class="main-content">
            <!-- 查询 -->
            <div class="search-content">
                <el-button type="default" icon="fa fa-refresh" @click="tableRefresh()" class="btn-refresh"></el-button>
                <el-button type="primary" @click="addList" class="btn-add" size="small">添加</el-button>
                <el-form :inline="true" :model="templateInfo" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="templateInfo.name" placeholder="请输入模板名称" size="small">
                            <template slot="prepend">模板名称</template>
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
                url:sessionStorage.getItem(this.$constant.APP_KEY.monitor)+`/monitor/template/page`,
                templateInfo:{
                    templateId:'',
                    name:''
                },
                resource:[],
                tableData:[],
                totalNum:1,
                itemData:[{
                    prop:"name",
                    label:"模板名称",
                    width:'200'
                },{
                    prop:"resourceType",
                    label:"资源类型",
                    width:'100'
                },{
                    prop:"remark",
                    label:"备注",
                    width:'200'
                }],
                operationData:[{
                    prop:"templateId",
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
            addList(){
                this.$router.push({
                    name:'monitorTemplateAdd',
                    params:{
                        resource:this.resource
                    }
                })
            },
            getDataList(val){
                this.loading=true
                this.$https.get(`${this.monitorUrl}/monitor/template/page`,{
                        page:val,
                        rows:this.$refs.baseTableData.pageSize,
                        templateId:this.templateInfo.templateId,
                        name:this.templateInfo.name,
                    })
                    .then((res) => {
                        this.loading=false
                        if(res.code === this.$constant.SUCCESS_CODE){
                            this.tableData = res.result.pageInfo.list
                            this.totalNum = res.result.pageInfo.total
                            this.tableData.forEach(item =>{
                                this.resource.push(item.resourceType)
                            })
                            for(let data of Object.values(this.tableData)){
                                data.resourceType = this.$conversionType('resource_type', data.resourceType)
                            }
                        }else{
                            this.loading=false
                        }
                    }).catch(error => {
                    this.loading=false
                })
            },
            onSubmit(){
                this.getDataList(this.$refs.baseTableData.currentPage)
            },
            tableRefresh(){
                this.templateInfo.name = ""
                this.$refs.baseTableData.currentPage = 1
                this.getDataList(this.$refs.baseTableData.currentPage)
            },
            gotoResourceDetailPage(type,obj){
                this.$router.push({
                    name:'monitorTemplateDetail',
                    params:{
                        templateId:obj.templateId
                    }
                })
            }
        },
    }
</script>

<style scoped>
    .demo-form-inline{
        float: right;
    }
    .search-content{
        padding: 10px 20px;
    }
</style>