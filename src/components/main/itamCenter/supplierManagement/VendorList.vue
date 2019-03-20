<template>
    <div class="operation-main-content">
        <!-- 导向 -->
        <NavTitle :titles="['运维中心','资产中心','供应商管理','厂商管理']"></NavTitle>
        <!-- 主体 -->
        <div class="main-content">
            <!-- 查询 -->
            <div class="search-content">
                <el-button type="default" icon="fa fa-refresh" @click="tableRefresh" class="btn-refresh"></el-button>
                <el-button type="primary" @click="addList" class="btn-add" size="small">添加</el-button>
                <el-form :inline="true" :model="searchData" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="searchData.code" placeholder="请输入厂商名称搜索" size="small" >
                            <template slot="prepend">厂商名称</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="small" class="btn-line-height">查询</el-button>
                        <el-button type="primary" icon="fa fa-download" @click="dialogFormVisible = true" size="small" plain class="btn-line-height">&nbsp;报表</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <!-- 表格 -->
            <div class="table-content">
                <base-table :tableData="tableData"
                            :itemData="itemData"
                            :operationData="operationData"
                            :total="totalNum"
                            ref="baseTableData"></base-table>
            </div>

        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import NavTitle from '@/components/common/NavTitle'
    import BaseTable from '@/components/common/table/BaseTable'
    import ExportDialog from '@/components/common/itam/ExportDialog'

    export default {
        name: "vendorList",
        data() {
            return {
                exportData:{
                    type:''
                },
                searchData:{
                    code:''
                },
                tableData:[],
                totalNum:0,
                itemData:[{
                    prop:'name',
                    label:'厂商名称',
                    width:'20%'
                },{
                    prop:'website',
                    label:'厂商主页',
                    width:'30%'
                },{
                    prop:'phone',
                    label:'联系电话',
                    width:'20%'
                },{
                    prop:'address',
                    label:'联系地址',
                    width:'50%'
                },{
                    prop:'remark',
                    label:'厂商备注',
                    width:'20%'
                }],
                operationData:[{
                    prop:"bottomHostId",
                    label:'操作',
                    width:'20%',
                    list:[{
                        name:'详情',
                        type:'detail',
                        textClass:'text-operation'
                    },{
                        name:"删除",
                        type:'delete',
                        textClass:'text-delete'
                    }]
                }],
                dialogFormVisible:false,
                itamUrl:sessionStorage.getItem(this.$constant.APP_KEY.itam)
            }
        },
        mounted(){
            this.getDataList(this.$refs.baseTableData.currentPage)
        },
        components: {
            NavTitle,
            BaseTable,
            ExportDialog
        },
        methods: {
            ...mapMutations(['CHANGE_LOADING_STATUS']),
            addList(){
                this.$router.push({
                    name:'vendorAdd'
                })
            },
            tableRefresh(){
                this.searchData.code = ''
                this.getDataList(this.$refs.baseTableData.currentPage)
            },
            onSubmit(){
                this.getDataList(this.$refs.baseTableData.currentPage)
            },
            getDataList(val){
                this.$https.get(`${this.itamUrl}/manufacturer/page`,{
                    page:val,
                    rows:this.$refs.baseTableData.pageSize,
                    name:this.searchData.code
                })
                    .then((response) => {
                        if(response.code == this.$constant.SUCCESS_CODE){
                            this.CHANGE_LOADING_STATUS({loading: false})
                            this.tableData = response.result.pageInfo.list
                            this.totalNum = response.result.pageInfo.total
                        }else{
                            this.$message.error(response.msg)
                        }
                    })
                    .catch(() => {
                        this.$message.error('请求异常')
                    })
            },
        },
    }
</script>

<style scoped>
    .demo-form-inline {
        float: right;
    }
    .search-content{
        padding: 10px 20px;
}
</style>