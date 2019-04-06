<template>
    <div class="table" ref="table">

        <el-table
            v-loading="loading"
            :data="tableData"
            :stripe="true"
            tooltip-effect="light"
            :height="tableHeight"
        >
            <!-- 表格数据 -->
            <el-table-column
                v-for="(data,key) in tableHeader"
                :key='`data-${key}`'
                :label="data.label"
                :prop="data.prop"
                :min-width="data.width"
                align="center"
                show-overflow-tooltip
            >
                <!--
                    slot-scope="scope"
                    scope.row: Object 对应data每一行的所有数据,可以对不同状态添加不同的类或图标
                    scope.$index: 对应当前行的下标
                -->
                <template slot-scope="{row, $index}">
                    <span :class="[row[data.className],row[data.classIcon]]">
                        <input class="edit-cell" v-if="showEdit[$index]"    v-model="row[data.prop]">
                        <span v-if="!showEdit[$index]">{{row[data.prop]}}</span>
                        <!-- {{ row[data.prop] }} -->
                    </span>
                </template>
            </el-table-column>

            <!-- 操作列 -->
            <el-table-column
                label="操作"
                min-width="100"
                align="center"
            >
                <template slot-scope="{row,$index}">
                    <el-button type="text" size="small" @click.native="handleUpdate($index, row)" v-if="showBtn[$index]">更新</el-button>
                    <el-button type="text" size="small" @click.native="handleCancel($index, row)" v-if="showBtn[$index]">取消</el-button>

                    <el-button type="text" size="small" @click.native="handleEdit($index, row)" v-if="!showBtn[$index]">编辑</el-button>
                    <el-button type="text" size="small" @click.native="handleDelete($index, row)" v-if="!showBtn[$index]">删除</el-button>
                </template>
            </el-table-column>
            <!-- <el-table-column
                v-for="(operation,key) in operationData"
                :key='`operation-${key}`'
                :prop="operation.prop"
                :label="operation.label"
                :min-width="operation.width"
                align="center"
            >
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        v-for="(item,index) in operation.list"
                        :key="index"
                        @click="handleOperation(scope.$index, tableData, item.type)"
                    >{{ item.name }}
                    </el-button>
                </template>
            </el-table-column> -->
        </el-table>

        <!-- 分页导航 -->
        <!-- <el-pagination
            background
            layout="total, prev, pager, next, jumper"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="total"
            @current-change="changeCurrentPage"
        ></el-pagination> -->
    </div>
</template>

<script>

export default {
    name: "baseTable",
    props:{
        loading:{
            type:Boolean,
            defalut:true
        },
        url:{
            type:String,
            defalut: ''
        },
        tableData:{
            type:Array,
            defalut: () => []
        },
        tableHeader:{
            type:Array,
            defalut: () => []
        },
        total:{
            type:Number,
            defalut:() => 0
        }
    },
    data(){
        return {
            tableHeight: 0,
            currentPage:1,
            pageSize:10,
            showEdit: [],
            showBtn: []
        }
    },

    mounted() {
        let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        let offsetTop = this.$refs.table.offsetTop
        console.log(this.$refs.table.offsetTop)
        this.$nextTick(() => {
        this.tableHeight = clientHeight - offsetTop - 30

            this.initOperationItem()
        })
    },
    methods:{
        // 初始化所有表格数据
        initOperationItem() {
            for(let i of Object.keys(this.tableData)) {
                this.showEdit[i] = false   //编辑状态
                this.showBtn[i] = false
            }
        },
        changeCurrentPage(val) {
            this.currentPage = val
            this.$parent.getDataList(val)
        },
        gotoDetailPage(type, obj){
            this.$parent.gotoResourceDetailPage(type, obj)
        },
        //编辑
        handleEdit(index, row) {
            // this.$nextTick(() => {

            //     this.initOperationItem()
            //     this.showEdit[index] = true;
            //     this.showBtn[index] = true;
            // })
            // this.$set(this.showEdit,row,true)
            // this.$set(this.showBtn,row,true)
        },
        //取消编辑
        handelCancel(index, row) {
            // this.getContentList();
            this.showEdit[index] = false;
            this.showBtn[index] = false;
        },

        //更新
        handleUpdate(formName) {

        },
        //删除
        handleDelete(index, row) {
            this.tableData.splice(index, 1)
        }
    }
}
</script>

<style lang="scss" scoped>
.table {
}
</style>