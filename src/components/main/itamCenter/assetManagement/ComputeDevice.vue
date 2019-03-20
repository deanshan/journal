<template>
    <div class="operation-main-content">
        <!-- 导向 -->
        <nav-title :titles="['运维中心','资产中心','资源管理','计算设备']"></nav-title>
        <!-- 主体 -->
        <div class="main-content">
            <!-- 查询 -->
            <div class="search-content">
                <el-button type="default" icon="fa fa-refresh" @click="tableRefresh" class="btn-refresh"></el-button>
                <el-button type="primary" @click="addList" class="btn-add" size="small">添加</el-button>
                <el-form :inline="true" :model="searchData" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="searchData.code" placeholder="请输入设备编码" size="small">
                            <template slot="prepend">设备编码</template>
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
            <!-- 导出 -->
            <export-dialog :dialogFormVisible="dialogFormVisible" v-on:visible-change="dialogFormVisible = false"></export-dialog>
        </div>

    </div>
</template>

<script>
    import NavTitle from '@/components/common/NavTitle'
    import BaseTable from '@/components/common/table/BaseTable'
    import ExportDialog from '@/components/common/itam/ExportDialog'

    export default {
        name: "computeDevice",
        data() {
            return {
                loading:true,
                exportData:{
                    type:''
                },
                searchData:{
                    code:''
                },
                tableData:[],
                totalNum:0,
                itemData:[{
                    prop:'assetCode',
                    label:'设备编码',
                    width:'80'
                },{
                    prop:'assetTypeName',
                    label:'资产类型',
                    width:'80'
                },{
                    prop:'price',
                    label:'采购价格(元)',
                    width:'100'
                },{
                    prop:'manufacturerName',
                    label:'厂商',
                    width:'80'
                },{
                    prop:'modelName',
                    label:'型号',
                    width:'80'
                },{
                    prop:'serviceStatus',
                    label:'服务状态',
                    width:'80'
                },{
                    prop:'dataCenterName',
                    label:'数据中心',
                    width:'80'
                },{
                    prop:'computerRoomName',
                    label:'机房',
                    width:'75'
                },{
                    prop:'cabinetName',
                    label:'机柜',
                    width:'75'
                },{
                    prop:'purchaseDate',
                    label:'采购日期',
                    width:'140'
                },{
                    prop:'expirationDate',
                    label:'维保日期',
                    width:'140'
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
                }],
                dialogFormVisible:false,
                itamUrl:sessionStorage.getItem(this.$constant.APP_KEY.itam)
            }
        },
        components:{
            BaseTable,
            NavTitle,
            ExportDialog
        },
        mounted(){
            this.getDataList(this.$refs.baseTableData.currentPage)
        },
        methods:{
            addList(){
                this.$router.push({
                    name:'computeAdd'
                })
            },
            tableRefresh(){
                this.searchData.code = ''
                this.getDataList(this.$refs.baseTableData.currentPage)
            },
            onSubmit(){
                this.getDataList(this.$refs.baseTableData.currentPage)
            },
            onExport(type){
                if(type == 1){
                    document.location.href=`${this.itamUrl}/export/resource/server`
                }else{
                    document.location.href=`${this.itamUrl}/export/resource/server?assetCode=${this.searchData.code}`
                }
            },
            getDataList(val){
                this.loading = true
                this.$https.get(`${this.itamUrl}/serverDevice/page`,{ page:val,
                    rows:this.$refs.baseTableData.pageSize,
                    assetCodeLike:this.searchData.code
                })
                    .then((response) => {
                        this.loading = false
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
            gotoResourceDetailPage(){
                this.$message.warning("暂不能查看详情")
            }
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