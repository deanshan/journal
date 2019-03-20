<template>
    <div class="operation-main-content">
        <!-- 导向 -->
        <NavTitle :titles="['运维中心','资产中心','位置管理','标签']"></NavTitle>
        <!-- 主体 -->
        <div class="main-content">
            <!-- 查询 -->
            <div class="search-content">
               <QueryComponent :searchInfo="searchInfo"></QueryComponent>
            </div>
            <!--表格-->
            <BaseTable
                    :loading="loading"
                    ref="baseTableData"
                    :tableData="tableData"
                    :itemData="itemData"
                    :operationData="operationData"
                    :total="totalNum"
            ></BaseTable>
        </div>
    </div>
</template>

<script>
    // 导向
    import NavTitle from '@/components/common/NavTitle'
    // 搜索
    import QueryComponent from '@/components/main/itamCenter/common/QueryComponent'
    //表格
    import BaseTable from '@/components/common/table/BaseTable'

    import { SUCCESS_CODE , APP_KEY} from "@/utils/constant";

    export default {
        name: "labelList",
        data() {
            return {
                loading: true,
                searchInfo:{
                    label:'标签名称',
                    value:''
                },
                itemData:[{
                    prop: 'name',
                    label: '标签名称',
                    width: '200'
                },{
                    prop:'remark',
                    label:'标签备注',
                    width: '200'
                }],
                operationData:[{
                    prop: 'labelId',
                    label: '操作',
                    width: '100',
                    list: [{
                        name: '详情',
                        type: 'detail',
                        textClass: 'text-operation'
                    },{
                        name:'删除',
                        type:'delete',
                        textClass:'text-delete'
                    }],
                }],
                tableData:[],
                totalNum:0
            }
        },
        computed:{
          itamUrl(){
              return sessionStorage.getItem(APP_KEY.itam)
          }
        },
        components: {
            NavTitle,
            QueryComponent,
            BaseTable
        },
        mounted(){
            this.getDataList(this.$refs.baseTableData.currentPage)
        },
        methods:{
            gotoDetailPage(row){
                this.$router.push({
                    name:'labelDetail',
                    params:{
                        labelId:row.labelId
                    }
                })
            },
            getDataList(val){
                this.loading = true
                this.$https.get(`${this.itamUrl}/label/page`,{
                    page: val,
                    rows: this.$refs.baseTableData.pageSize,
                    name: this.searchInfo.value
                })
                    .then(res => {
                        this.loading = false
                        this.tableData = res.result.pageInfo.list
                        this.totalNum = res.result.pageInfo.total
                    })
            },
            tableRefresh(){
                this.searchInfo.value = ''
                this.getDataList(this.$refs.baseTableData.currentPage)
            },
            onSubmit(){
                this.getDataList(this.$refs.baseTableData.currentPage)
            },
            add(){
                this.$router.push({
                    name:'labelAdd'
                })
            },
            deleteRow(index,row){
                this.$confirm("确定要删除选中的标签吗？", "操作提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$https.delete(`${this.itamUrl}/label/delete`, {
                        labelId: row.labelId
                    }).then((res) => {
                        if(res.code == SUCCESS_CODE) {
                           this.tableData.splice(index,1)
                           this.$notify.success(res.msg)
                        }else {
                            this.$notify.error(res.msg)
                        }
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .search-content{
        padding: 10px 20px;
    }
    .main-content{
        min-height: 500px;
    }
</style>