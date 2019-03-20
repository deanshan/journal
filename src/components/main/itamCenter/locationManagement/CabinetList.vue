<template>
    <div class="operation-main-content">
        <!-- 导向 -->
        <NavTitle :titles="['运维中心','资产中心','位置管理','机柜']"></NavTitle>
        <!-- 主体 -->
        <div class="main-content">
            <!-- 查询 -->
            <div class="search-content">
                <el-button type="default" icon="fa fa-refresh" @click="tableRefresh" class="btn-refresh"></el-button>
                <el-button type="primary" @click="addList" class="btn-add" size="small">添加</el-button>
                <el-form :inline="true" :model="searchData" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="searchData.code" placeholder="请输入机柜名称" size="small">
                            <template slot="prepend">机柜名称</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="small" class="btn-line-height">查询</el-button>
                        <el-button type="primary" icon="fa fa-download" @click="dialogFormVisible = true" size="small" plain class="btn-line-height">&nbsp;</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 表格 -->
            <div class="table-content">
                <itam-center-table
                        :tableData="tableData"
                        :loading="loading"
                        :itemData="itemData"
                        :operationData="operationData"
                        :total="totalNum"
                        ref="itamCenterTableData"></itam-center-table>
            </div>
            <!-- 导出 -->
            <export-dialog :dialogFormVisible="dialogFormVisible" v-on:visible-change="dialogFormVisible = false"
                           dialog-title="导出机柜" :optionData="optionData"></export-dialog>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import NavTitle from '@/components/common/NavTitle'
    import ExportDialog from '@/components/common/itam/ExportDialog'
    import ItamCenterTable from '@/components/common/table/ItamCenterTable'

    export default {
        name: "cabinetList",
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
                    label:'机柜名称',
                    width:'80'
                },{
                    prop:'dataCenterName',
                    label:'数据中心',
                    width:'80'
                },{
                    prop:'computerRoomName',
                    label:'所属机房',
                    width:'100'
                },{
                    prop:'manufacturerName',
                    label:'所属厂商',
                    width:'80'
                },{
                    prop:'modelName',
                    label:'机柜型号',
                    width:'80'
                },{
                    prop:'units',
                    label:'总U位数',
                    width:'80'
                },{
                    prop:'remark',
                    label:'机柜备注',
                    width:'80'
                }],
                operationData:[{
                    prop:"bottomHostId",
                    label:'操作',
                    width:'90',
                    list:[{
                        name:'详情',
                        type:'detail',
                        textClass:'text-operation'
                    },{
                        name:"删除",
                        type:'delete',
                        textClass:'text-delete'
                    }]
                }],optionData: [
                    {label: "导出全部机柜", value: 1},
                    {label: "导出当前搜索条件下的机柜", value: 2}
                ],
                loading:true,
                dialogFormVisible:false,
                itamUrl:sessionStorage.getItem(this.$constant.APP_KEY.itam)
            }
        },
        components:{
            NavTitle,
            ExportDialog,
            ItamCenterTable
        },
        mounted(){
            this.getDataList(this.$refs.itamCenterTableData.currentPage)
        },
        methods:{
            ...mapMutations(['CHANGE_LOADING_STATUS']),
            addList(){
                this.$router.push({
                    name:'cabinetAdd'
                })
            },
            gotoResourceDetailPage(data) {
                this.$router.push({
                    name: 'cabinetDetail',
                    query: {
                        cabinetId: data.cabinetId
                    }
                })
            },
            handleDelete(index, data) {
                this.$confirm("确定要删除该机柜的信息吗？", "操作提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.$https.delete(`${this.itamUrl}/cabinet/delete`, {
                            cabinetId: data.cabinetId
                        })
                            .then((response) => {
                                if (response.code == this.$constant.SUCCESS_CODE) {
                                    this.tableData.splice(index, 1);
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    })
                                } else {
                                    this.$message.error(response.msg)
                                }
                            }).catch(() => {
                            this.$message.error('请求异常')
                        })

                    })
            },
            tableRefresh(){
                this.searchData.code = ''
                this.getDataList(this.$refs.itamCenterTableData.currentPage)
            },
            onSubmit(){
                this.getDataList(this.$refs.itamCenterTableData.currentPage)
            },
            onExport(type){
                if(type == 1){
                    document.location.href=`${this.itamUrl}/export/resource/cabinet`
                }else{
                    document.location.href=`${this.itamUrl}/export/resource/cabinet?name=${this.searchData.code}`
                }
            },
            getDataList(val){
                this.$https.get(`${this.itamUrl}/cabinet/page`,{
                    page:val,
                    rows:this.$refs.itamCenterTableData.pageSize,
                    name:this.searchData.code
                })
                    .then((response) => {
                        this.loading=false;
                        if(response.code == this.$constant.SUCCESS_CODE){
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
        }
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