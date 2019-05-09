<template>
    <div class="table" ref="table">
        <!-- 查询条件 -->
        <div class="query-content">

            <el-input v-model="queryTerms.name.value" :placeholder="queryTerms.name.label" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />

            <el-select v-model="queryTerms.arrange.value" :placeholder="queryTerms.arrange.label" clearable style="width: 110px" class="filter-item">
                <el-option v-for="item in queryTerms.arrange.list" :key="item" :label="item" :value="item" />
            </el-select>

            <el-button class="filter-item" type="primary" icon="el-icon-search" @click.native="handleFilter">搜索</el-button>

            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>

            <!-- <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button> -->

            <el-checkbox-group v-model="checkboxVal" class="filter-item">
                <el-checkbox label="type">类型</el-checkbox>
                <el-checkbox label="details">详情</el-checkbox>
            </el-checkbox-group>
        </div>

        <el-table
            v-loading="loading"
            :data="data"
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
                    scope: [Object Object] 参数：row $index
                    row: Object 对应data每一行的所有数据,可以对不同状态添加不同的类或图标
                    $index: 对应当前行的下标索引
                -->
                <template slot-scope="{row}">
                    <span v-if="row.isEdit">
                        <span v-if="data.number_flag">{{row[data.prop]}}</span>
                        <el-input v-else v-model="row[data.prop]"></el-input>
                    </span>
                    <span v-else :class="[row[data.className],row[data.classIcon]]">
                        <a v-if="data.href" :href="row[data.prop]" target="_blank">{{row[data.prop]}}</a>
                        <span v-else>{{row[data.prop]}}</span>
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
                    <template v-if="row.isEdit">
                        <el-button type="text" size="small" @click.native="handleUpdate(row, $index)">更新</el-button>
                        <el-button type="text" size="small" @click.native="handelCancel(row, $index)">取消</el-button>
                    </template>
                    <template v-else>
                        <el-button type="text" size="small" @click.native="handleEdit(row, $index)">编辑</el-button>
                        <el-button type="text" size="small" @click.native="handleDelete($index)">删除</el-button>
                    </template>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination">
            <el-button class="first" :disabled="currentPage === 1">首页</el-button>
            <el-button class="prev" :disabled="currentPage === 1" @click.native="prev">上一页</el-button>
            <el-pagination
                layout="pager"
                :total="500"
                :current-page="currentPage"
                @current-change="changeCurrentPage"
            ></el-pagination>
            <el-button class="next" :disabled="currentPage === 50" @click.native="next">下一页</el-button>
            <el-button class="last" :disabled="currentPage === 50">尾页</el-button>
        </div>

        <el-dialog title="添加" :visible.sync="dialogFormVisible">
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="temp.name" placeholder="Please write name"/>
                </el-form-item>
                <el-form-item label="来源" prop="source">
                    <el-input v-model="temp.source" placeholder="Please write source"/>
                </el-form-item>
                <el-form-item label="是否整理" prop="arrange">
                    <el-select v-model="temp.arrange.value" placeholder="Please select">
                        <el-option v-for="item in temp.arrange.list" :key="item.key" :label="item" :value="item.key" />
                    </el-select>
                </el-form-item>
                <el-form-item label="时间" prop="timestamp">
                    <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
                </el-form-item>
                <el-form-item label="重要性">
                    <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
            </div>
        </el-dialog>
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
        tableData:{
            type:Array,
            defalut: () => []
        },
    },
    data(){
        return {
            data: this.tableData,
            checkboxVal: ['details'],
            queryTerms: {
                name: { label: '名称', value: '' },
                arrange: {
                    label: '是否整理',
                    value: '',
                    list: ['否','是']
                }
            },
            downloadLoading: false,
            originalData: [],
            tableHeight: 0,
            tableHeader: [  // 默认显示的表头
                { prop: "name",    label: "名称", width: '100', className: 'textColor' },
                { prop: "source",  label: "来源", width: '180', className: 'className', href: true },
                { prop: "arrange", label: "是否整理", width: '40' },
                { prop: "number",  label: "阅读数", width: '60', number_flag: true },
                { prop: "details", label: "详情", width: '240' },
            ],
            tableHeaderOptions: [
                { prop: "type",    label: "类型", width: '100' },
                { prop: "details", label: "详情", width: '240' },
            ],
            currentPage: 1,
            dialogFormVisible: false,
            rules: {
                type: [{ required: true, message: 'type is required', trigger: 'change' }],
                timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
                title: [{ required: true, message: 'title is required', trigger: 'blur' }]
            },
            temp: {
                name: '',
                source: '',
                arrange: {
                    label: '是否整理',
                    value: '',
                    list: ['否','是']
                },
                importance: 1,
                remark: '',
                timestamp: new Date(),
            },
        }
    },
    mounted() {
        let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        let offsetTop = this.$refs.table.offsetTop
        console.log(this.$refs.table.offsetTop)
        this.$nextTick(() => {
            this.tableHeight = clientHeight - offsetTop - 130
        })
    },
    methods:{
        handleFilter() {
            let name = this.queryTerms.name.value
            let arrange = this.queryTerms.arrange.value
            this.data = this.tableData.filter(v => (v.name.includes(name) && v.arrange.includes(arrange)))
        },
        handleCreate() {
            this.dialogFormVisible = true
        },
        //编辑
        handleEdit(row, index) {
            row.isEdit = !row.isEdit
            this.originalData[index] = Object.assign({}, row)
            // for(let [k, v] of Object.entries(row)) {
            //     this.originalData[index][k] = v
            // }
        },
        //取消
        handelCancel(row, index) {
            row = Object.assign(row, this.originalData[index])
            row.isEdit = !row.isEdit
        },
        //更新
        handleUpdate(row, index) {
            this.originalData[index] = row
            row.isEdit = !row.isEdit
        },
        //删除
        handleDelete(index) {
            this.tableData.splice(index, 1)
        },
        changeCurrentPage(page) {
            console.log(page)
            this.currentPage = page
        },
        prev() {
            this.currentPage > 1 && this.currentPage--
        },
        next() {
            this.currentPage < 50 && this.currentPage++
        }
    },
    watch: {
        checkboxVal(newVal) {
            this.tableHeaderOptions.map(item => this.tableHeader.map((v,k) => { v.prop.includes(item.prop) && this.tableHeader.splice(k,1) })) // 初始化表头数据
            let option = this.tableHeaderOptions.filter(v => newVal.includes(v.prop))   //  过滤出选中的数据
            option.map(v => this.tableHeader.push(v))   //  将选中的数据添加到表头
            this.tableHeader = Array.from(new Set(this.tableHeader))    //  表头数据去重
        }
    }
}
</script>

<style lang="scss">
.table {
    .pagination {
        display: flex;
    }
}
</style>

<style lang="scss" scoped>
.query-content {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    margin-bottom: 20px;
    .filter-item {
        margin-right: 20px;
    }
}
.pagination {
    position: relative;
}
</style>