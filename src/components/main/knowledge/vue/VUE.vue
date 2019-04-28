<template>

    <div class="vue-content">

        <NavTitle :titles="['知识库','VUE','html']"></NavTitle>

        <!-- 主体 -->
        <div class="main-content">
            <!-- 查询 -->
            <QueryTable
                :queryTerms="queryTerms"
                @tableRefresh="tableRefresh"
                @onSubmit="onSubmit"
                @onExport="onExport"
            ></QueryTable>
            <!--表格-->
            <Table
                :loading="loading"
                :url="url"
                ref="tableData"
                :tableData="tableData"
                :tableHeader="tableHeader"
                :total="totalNum"
            ></Table>
        </div>
    </div>
</template>

<script>

import NavTitle from '@/components/common/NavTitle'
import Table from '@/components/common/Table'
import QueryTable from '@/components/common/QueryTable'

export default {
    name: "host",
    data() {
        return {
            loading: false,     //页面加载状态
            url: '',
            tableData:[
                {
                    name: '垂直居中1',
                    knowledgePoints: 'css2/css3',
                    details: '纯CSS实现垂直居中的几种方法',
                    url: 'https://www.cnblogs.com/hutuzhu/p/4450850.html',
                    source: '博客圆',
                    arrange: '否',
                    number: '0',
                },
                {
                    name: '垂直居中1',
                    knowledgePoints: 'css2/css3',
                    details: '纯CSS实现垂直居中的几种方法',
                    url: 'https://www.cnblogs.com/hutuzhu/p/4450850.html',
                    source: '博客圆',
                    arrange: '否',
                    number: '0',
                },
                    {
                        name: '垂直居中1',
                        knowledgePoints: 'css2/css3',
                        details: '纯CSS实现垂直居中的几种方法',
                        url: 'https://www.cnblogs.com/hutuzhu/p/4450850.html',
                        source: '博客圆',
                        arrange: '否',
                        number: '0',
                    },
                {
                    name: '垂直居中2',
                    knowledgePoints: 'css2/css3',
                    details: '纯CSS实现垂直居中的几种方法',
                    url: 'https://www.cnblogs.com/hutuzhu/p/4450850.html',
                    source: '博客圆',
                    arrange: '否',
                    number: '0'
                },
                {
                    name: '垂直居中3',
                    knowledgePoints: 'css2/css3',
                    details: '纯CSS实现垂直居中的几种方法',
                    url: 'https://www.cnblogs.com/hutuzhu/p/4450850.html',
                    source: '博客圆',
                    arrange: '否',
                    number: '0'
                },
                {
                    name: '垂直居中',
                    knowledgePoints: 'css2/css3',
                    details: '纯CSS实现垂直居中的几种方法',
                    url: 'https://www.cnblogs.com/hutuzhu/p/4450850.html',
                    source: '博客圆',
                    arrange: '否',
                    number: '0'
                },
                {
                    name: '垂直居中',
                    knowledgePoints: 'css2/css3',
                    details: '纯CSS实现垂直居中的几种方法',
                    url: 'https://www.cnblogs.com/hutuzhu/p/4450850.html',
                    source: '博客圆',
                    arrange: '否',
                    number: '0'
                },
                {
                    name: '垂直居中',
                    knowledgePoints: 'css2/css3',
                    details: '纯CSS实现垂直居中的几种方法',
                    url: 'https://www.cnblogs.com/hutuzhu/p/4450850.html',
                    source: '博客圆',
                    arrange: '否',
                    number: '0'
                },
                {
                    name: '垂直居中',
                    knowledgePoints: 'css2/css3',
                    details: '纯CSS实现垂直居中的几种方法',
                    url: 'https://www.cnblogs.com/hutuzhu/p/4450850.html',
                    source: '博客圆',
                    arrange: '否',
                    number: '0'
                },
                {
                    name: '垂直居中',
                    knowledgePoints: 'css2/css3',
                    details: '纯CSS实现垂直居中的几种方法',
                    url: 'https://www.cnblogs.com/hutuzhu/p/4450850.html',
                    source: '博客圆',
                    arrange: '否',
                    number: '0'
                },
                {
                    name: '垂直居中',
                    knowledgePoints: 'css2/css3',
                    details: '纯CSS实现垂直居中的几种方法',
                    url: 'https://www.cnblogs.com/hutuzhu/p/4450850.html',
                    source: '博客圆',
                    arrange: '否',
                    number: '0'
                },
                {
                    name: '垂直居中',
                    knowledgePoints: 'css2/css3',
                    details: '纯CSS实现垂直居中的几种方法',
                    url: 'https://www.cnblogs.com/hutuzhu/p/4450850.html',
                    source: '博客圆',
                    arrange: '否',
                    number: '0'
                },
            ],
            totalNum:0,
            queryTerms: {
                name: {
                    label: '名称',
                    value: ''
                },
                arrange: {
                    label: '状态',
                    value: '',
                    lists: [
                        {
                            label: '是',
                            value: 'yes'
                        },
                        {
                            label: '否',
                            value: 'no'
                        }
                    ]
                }
            },
            tableHeader: [
                {
                    prop: "name",
                    label: "名称",
                    width: '240',
                    className: 'textColor'
                },
                {
                    prop: "knowledgePoints",
                    label: "知识点",
                    width: '160'
                },
                {
                    prop: "details",
                    label: "详情",
                    width: '140'
                },
                {
                    prop: "url",
                    label: "url",
                    width: '160'
                },
                {
                    prop: "source",
                    label: "来源",
                    width: '80',
                    className: 'className'
                },
                {
                    prop: "arrange",
                    label: "是否整理",
                    width: '140'
                },
                {
                    prop: "number",
                    label: "查看次数",
                    width: '140'
                }
            ]
        }
    },
    components:{
        NavTitle,
        QueryTable,
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
.vue-content {
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