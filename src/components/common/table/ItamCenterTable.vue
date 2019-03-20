<template>
    <div class="base-table">

        <el-table v-loading="loading" :data="tableData">
            <!-- 表格数据 -->
            <el-table-column
                    v-for="(datas,key) in itemData"
                    :key='`data-${key}`'
                    :label="datas.label"
                    :prop="datas.prop"
                    :min-width="datas.width"
                    align="left"
            >
                <template slot-scope="scope">
                    <span :class="scope.row[datas.className]">{{ scope.row[datas.prop] }}</span>
                </template>
            </el-table-column>

            <!-- 操作列 -->
            <el-table-column
                    v-for="(operation,key) in operationData"
                    :key='`operation-${key}`'
                    :prop="operation.prop"
                    :label="operation.label"
                    :min-width="operation.width"
                    align="center"
            >
                <template slot-scope="scope">
                    <a
                            v-for="(item,index) in operation.list"
                            :key="index"
                            :class="item.textClass"
                            :title="item.name"
                            @click="handleOperation(scope.$index, scope.row,item.type)"
                    >{{ item.name }}
                    </a>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页导航 -->
        <el-pagination
                background
                layout="total, prev, pager, next, jumper"
                :current-page="currentPage"
                :page-size="pageSize"
                :total="total"
                @current-change="changeCurrentPage"
        ></el-pagination>
    </div>
</template>

<script>

    export default {
        name: "itamCenterTable",
        props:['loading', 'url', 'tableData', 'itemData', 'operationData', 'total'],
        data(){
            return {
                currentPage:1,
                pageSize:10,
            }
        },
        methods:{
            changeCurrentPage(val) {
                this.loading = true
                this.currentPage = val
                this.$parent.getDataList(val)
            },
            gotoDetailPage(obj){
                this.$parent.gotoResourceDetailPage(obj)
            },
            handleDelete(index,obj){
                this.$parent.handleDelete(index,obj)
            },
            handleOperation(index,row,type){
                switch(type){
                    case 'detail':
                        this.gotoDetailPage(row)
                        break;
                    case 'delete':
                        this.handleDelete(index,row)
                        break;
                }
            }
        }
    }
</script>

<style scoped>

</style>