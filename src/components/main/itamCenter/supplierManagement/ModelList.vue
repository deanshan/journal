<template>
    <div class="operation-main-content">
        <!-- 导向 -->
        <NavTitle :titles="['资产管理', '供应商管理', '型号管理']"></NavTitle>
        <!-- 主体 -->
        <div class="main-content">
            <!-- 查询 -->
            <div class="search-content">
                <el-button type="default" icon="fa fa-refresh" @click="tableRefresh" class="btn-refresh"></el-button>
                <el-button type="primary" @click="addList" class="btn-add" size="small">添加</el-button>
                <el-form :inline="true" :model="searchData" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="searchData.code" placeholder="请输入型号名称搜索" size="small">
                            <template slot="prepend">型号名称</template>
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
                            ref="baseTableData">
                </base-table>
            </div>
            <!--导出-->
            <export-dialog :dialogFormVisible="dialogFormVisible" v-on:visible-change="dialogFormVisible = false"></export-dialog>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import NavTitle from '@/components/common/NavTitle'
    import BaseTable from '@/components/common/table/BaseTable'
    // import MultipleSearchPopup from '@/components/common/itam/MultipleSearchPopup'
    import ExportDialog from '@/components/common/itam/ExportDialog'
    export default {
        name: "model",
        data(){
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
                    prop:"name",
                    label:"型号名称",
                    width:'130'
                },{
                    prop:"category",
                    label:"资产分类",
                    width:'130'
                },{
                    prop:"assetTypeName",
                    label:"资产类型",
                    width:'130'
                },{
                    prop:"manufacturerName",
                    label:"所属厂商",
                    width:'130'
                },{
                    prop:"units",
                    label:"U位数",
                    width:'130'
                },{
                    prop:"portNumber",
                    label:"端口数",
                    width:'130'
                },{
                    prop:"remark",
                    label:"型号备注",
                    width:'130'
                }],
                operationData:[{
                    prop:"id",
                    label:"操作",
                    width:'130',
                    list:[{
                        name:"详情",
                        type: 'detail',
                        textClass:"text-operation"
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
            ...mapMutations(['CHANGE_LOADING_STATUS']),
            addList(){
                this.$router.push({
                    name:'modelAdd'
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
                this.$https.get(`${this.itamUrl}/model/page`,{ page:val,
                    rows:this.$refs.baseTableData.pageSize,
                    assetCodeLike:this.searchData.code
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