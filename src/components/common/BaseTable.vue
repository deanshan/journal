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
                    <span :class="[scope.row[datas.className],scope.row[datas.classIcon]]">
                        <span v-if="!scope.row[datas.hidden]">{{ scope.row[datas.prop] }}</span>
                    </span>
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
        itemData:{
            type:Array,
            defalut: () => []
        },
        operationData:{
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
            currentPage:1,
            pageSize:10,
        }
    },
    methods:{
        changeCurrentPage(val) {
            this.currentPage = val
            this.$parent.getDataList(val)
        },
        gotoDetailPage(type, obj){
            this.$parent.gotoResourceDetailPage(type, obj)
        },
        handleOperation(index,row,type){
        }
    }
}
</script>

<style scoped>
.hidden{
    display: none;
}
</style>