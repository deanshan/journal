<template>

    <div class="html-content">

        <NavTitle :titles="['知识库','HTML','html']"></NavTitle>

        <!-- 主体 -->
        <div class="main-content">
            <!-- 查询 -->
            <!-- <QueryTable
                :queryTerms="queryTerms"
                @tableRefresh="tableRefresh"
                @onSubmit="onSubmit"
                @onExport="onExport"
            ></QueryTable> -->
            <!--表格-->
            <Table
                :loading="loading"
                :tableData="tableData"
            ></Table>
        </div>
    </div>
</template>

<script>

import NavTitle from '@/components/common/NavTitle'
import Table from '@/components/common/Table'
// import QueryTable from '@/components/common/QueryTable'

export default {
    name: "host",
    data() {
        return {
            loading: false,     //页面加载状态
            tableData:[
                {
                    name: '垂直居中1',
                    type: 'css2/css3',
                    details: '纯CSS实现垂直居中的几种方法',
                    source: 'https://www.cnblogs.com/hutuzhu/p/4450850.html',
                    arrange: '是',
                    number: '0',
                    isEdit: false
                },
                {
                    name: '垂直居中1',
                    type: 'css2/css3',
                    details: '纯CSS实现垂直居中的几种方法',
                    source: 'https://www.cnblogs.com/hutuzhu/p/4450850.html',
                    arrange: '是',
                    number: '0',
                    isEdit: false
                },
                {
                    name: '垂直居中1',
                    type: 'css2/css3',
                    details: '纯CSS实现垂直居中的几种方法',
                    source: 'https://www.cnblogs.com/hutuzhu/p/4450850.html',

                    arrange: '否',
                    number: '0',
                    isEdit: false
                },
                {
                    name: '垂直居中2',
                    type: 'css2/css3',
                    details: '纯CSS实现垂直居中的几种方法',
                    source: 'https://www.cnblogs.com/hutuzhu/p/4450850.html',
                    arrange: '否',
                    number: '0',
                    isEdit: false
                },
                {
                    name: '垂直居中3',
                    type: 'css2/css3',
                    details: '纯CSS实现垂直居中的几种方法',
                    source: 'https://www.cnblogs.com/hutuzhu/p/4450850.html',
                    arrange: '否',
                    number: '0',
                    isEdit: false
                },
                {
                    name: '垂直居中',
                    type: 'css2/css3',
                    details: '纯CSS实现垂直居中的几种方法',
                    source: 'https://www.cnblogs.com/hutuzhu/p/4450850.html',
                    arrange: '否',
                    number: '0',
                    isEdit: false
                },
                {
                    name: '垂直居中',
                    type: 'css2/css3',
                    details: '纯CSS实现垂直居中的几种方法',
                    source: 'https://www.cnblogs.com/hutuzhu/p/4450850.html',
                    arrange: '否',
                    number: '0',
                    isEdit: false
                },
                {
                    name: '垂直居中',
                    type: 'css2/css3',
                    details: '纯CSS实现垂直居中的几种方法',
                    source: 'https://www.cnblogs.com/hutuzhu/p/4450850.html',
                    arrange: '否',
                    number: '0',
                    isEdit: false
                },
                {
                    name: '垂直居中',
                    type: 'css2/css3',
                    details: '纯CSS实现垂直居中的几种方法',
                    source: 'https://www.cnblogs.com/hutuzhu/p/4450850.html',
                    arrange: '否',
                    number: '0',
                    isEdit: false
                },
                {
                    name: '垂直居中',
                    type: 'css2/css3',
                    details: '纯CSS实现垂直居中的几种方法',
                    source: 'https://www.cnblogs.com/hutuzhu/p/4450850.html',
                    arrange: '否',
                    number: '0',
                    isEdit: false
                },
                {
                    name: '垂直居中',
                    type: 'css2/css3',
                    details: '纯CSS实现垂直居中的几种方法',
                    source: 'https://www.cnblogs.com/hutuzhu/p/4450850.html',
                    arrange: '否',
                    number: '0',
                    isEdit: false
                },
                {
                    name: '垂直居中',
                    type: 'css2/css3',
                    details: '纯CSS实现垂直居中的几种方法',
                    source: 'https://www.cnblogs.com/hutuzhu/p/4450850.html',
                    arrange: '否',
                    number: '0',
                    isEdit: false
                },
            ],
        }
    },
    components:{
        NavTitle,
        // QueryTable,
        Table
    },
    mounted() {
        for (let data of Object.values(this.tableData)) {
            data['textColor'] = 'bell-green'
        }
    },
    methods:{
        onSubmit(){

        },
        onExport(){

        },
        tableRefresh(val){
        },
    }
}
</script>

<style lang="scss" scoped>
.html-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    .main-content {
        flex: auto;
        display: flex;
        flex-direction: column
    }
}
</style>