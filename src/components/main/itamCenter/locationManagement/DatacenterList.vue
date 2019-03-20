<template>
    <div class="operation-main-content">
        <!-- 导向 -->
        <NavTitle :titles="['运维中心','资产中心','位置管理','数据中心']"></NavTitle>
        <!-- 主体 -->
        <div class="main-content">
            <!-- 查询 -->
            <div class="search-content">
                <!-- 刷新 -->
                <el-button type="default" class="btn-refresh" icon="fa fa-refresh" @click="tableRefresh"></el-button>
                <el-button type="primary" @click="addList" class="btn-add" size="small">添加</el-button>
                <el-form :inline="true" :model="searchData" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="searchData.keywords" placeholder="请输入数据中心名称" size="small">
                            <template slot="prepend">数据中心名称</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="small" class="btn-line-height">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 表格 -->
            <div class="table-content">
                <div class="table-content">
                    <base-table :tableData="tableData"
                                :itemData="itemData"
                                :operationData="operationData"
                                :total="totalNum"
                                ref="baseTableData"></base-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import NavTitle from '@/components/common/NavTitle'
    import BaseTable from '@/components/common/table/BaseTable'

    export default {
        name: "datacenterList",
        data() {
            return {
                searchData:{
                    keywords:''
                },
                tableData:[],
                totalNum:0,
                itemData:[{
                    prop:'name',
                    label:'数据中心名称',
                    width:'80'
                },{
                    prop:'countryValue',
                    label:'所属地区',
                    width:'80'
                },{
                    prop:'address',
                    label:'数据中心地址',
                    width:'100'
                },{
                    prop:'remark',
                    label:'数据中心备注',
                    width:'80'
                }],
                operationData:[{
                    prop:"dataCenterId",
                    label:'操作',
                    width:'90',
                    list:[{
                        name:'详情',
                        type:'detail',
                        textClass:'text-operation'
                    }]
                }],
                itamUrl:sessionStorage.getItem(this.$constant.APP_KEY.itam)
            }
        },
        methods:{
            ...mapMutations(['CHANGE_LOADING_STATUS']),
            tableRefresh(){
                this.searchData.keywords = ''
                this.getDataList(this.$refs.baseTableData.currentPage)
            },
            addList(){
                this.$router.push({
                    name:'datacenterAdd'
                })
            },
            onSubmit(){
                this.getDataList(this.$refs.baseTableData.currentPage)
            },
            getDataList(val){
                this.$https.get(`${this.itamUrl}/datacenter/page`,{ page:val,
                    rows:this.$refs.baseTableData.pageSize,
                    name:this.searchData.keywords
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
            }
        },
        components: {
            NavTitle,
            BaseTable
        },
        mounted(){
            this.getDataList(this.$refs.baseTableData.currentPage)
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