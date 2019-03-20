<template>
    <div class="operation-main-content">
        <!-- 导向 -->
        <NavTitle :titles="['运维中心','资产中心','供应商管理','人员管理']"></NavTitle>
        <!-- 主体 -->
        <div class="main-content">
            <!-- 查询 -->
            <div class="search-content">
                <el-button type="default" icon="fa fa-refresh" @click="tableRefresh" class="btn-refresh"></el-button>
                <el-button type="primary" @click="add" class="btn-add" size="small">添加</el-button>
                <el-form :inline="true" :model="searchData" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="searchData.code" placeholder="请输入人员名称搜索" size="small">
                            <template slot="prepend">人员名称</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="small"
                                   class="btn-line-height">查询
                        </el-button>
                        <el-button type="primary" icon="fa fa-download" @click="dialogFormVisible = true" size="small"
                                   plain class="btn-line-height"></el-button>
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
                           dialog-title="导出人员" :optionData="optionData"></export-dialog>
        </div>
    </div>
</template>

<script>
    // import { mapMutations } from 'vuex'
    import NavTitle from '@/components/common/NavTitle'
    import ItamCenterTable from '@/components/common/table/ItamCenterTable'
    import ExportDialog from '@/components/common/itam/ExportDialog'

    export default {
        name: "personnelList",
        data() {
            return {
                exportData: {
                    type: ''
                },
                searchData: {
                    code: ''
                },
                totalNum: 0,
                tableData: [],
                itemData: [{
                    prop: 'name',
                    label: '人员名称',
                    width: '80'
                }, {
                    prop: 'manufacturerName',
                    label: '所属厂商',
                    width: '80'
                }, {
                    prop: 'phone',
                    label: '联系电话',
                    width: '100'
                }, {
                    prop: 'email',
                    label: '联系邮箱',
                    width: '150'
                }, {
                    prop: 'typeValue',
                    label: '人员分类',
                    width: '80'
                }, {
                    prop: 'remark',
                    label: '人员备注',
                    width: '80'
                }],
                operationData: [{
                    prop: "bottomHostId",
                    label: '操作',
                    width: '90',
                    list: [{
                        name: '详情',
                        type: 'detail',
                        textClass: 'text-operation'
                    }, {
                        name: "删除",
                        type: 'delete',
                        textClass: 'text-delete'
                    }]
                }],
                optionData: [
                    {label: "导出全部人员", value: 1},
                    {label: "导出当前搜索条件下的人员", value: 2}
                ],
                loading:true,
                dialogFormVisible: false,
                itamUrl: sessionStorage.getItem(this.$constant.APP_KEY.itam)
            }
        },
        components: {
            ItamCenterTable,
            NavTitle,
            ExportDialog
        },
        mounted() {
            this.getDataList(this.$refs.itamCenterTableData.currentPage)
        },
        methods: {
            add() {
                this.$router.push({
                    name: 'personnelAdd'
                })
            },
            gotoResourceDetailPage(data) {
                this.$router.push({
                    name: 'personnelDetail',
                    query: {
                        contactId: data.contactId
                    }
                })
            },
            tableRefresh() {
                this.searchData.code = ''
                this.getDataList(this.$refs.itamCenterTableData.currentPage)
            },
            onSubmit() {
                this.getDataList(this.$refs.itamCenterTableData.currentPage)
            },
            onExport(type) {
                if (type == 1) {
                    document.location.href = `${this.itamUrl}/export/contact?name=`
                } else {
                    document.location.href = `${this.itamUrl}/export/contact?name=${this.searchData.code}`
                }
            },
            gotoResourceDetailPage(data) {
                this.$router.push({
                    name: 'personnelDetail',
                    query: {
                        contactId: data.contactId
                    }
                })
            },
            handleDelete(index, data) {
                this.$confirm("确定要删除该人员的信息吗？", "操作提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$https.delete(`${this.itamUrl}/contact/delete`, {
                        contactId: data.contactId
                    }).then((response) => {
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
            getDataList(val) {
                this.loading=true;
                this.$https.get(`${this.itamUrl}/contact/page`, {
                    page: val,
                    rows: this.$refs.itamCenterTableData.pageSize,
                    name: this.searchData.code
                })
                    .then((response) => {
                        this.loading=false;
                        if (response.code == this.$constant.SUCCESS_CODE) {
                            this.tableData = response.result.pageInfo.list;
                            this.totalNum = response.result.pageInfo.total;
                        } else {
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
    .demo-form-inline {
        float: right;
    }

    .search-content {
        padding: 10px 20px;
    }
</style>