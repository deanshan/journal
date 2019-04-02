<template>

    <div class="html-content">

        <NavTitle :titles="['HTML']"></NavTitle>

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
            <BaseTable
                :loading="loading"
                :url="url"
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

import NavTitle from '@/components/common/NavTitle'
import BaseTable from '@/components/common/BaseTable'
import QueryTable from '@/components/common/QueryTable'

export default {
    name: "host",
    data() {
        return {
            loading: false,
            url: '',
            tableData:[
                {
                    name: '垂直居中',
                    knowledgePoints: 'css2/css3',
                    details: '纯CSS实现垂直居中的几种方法',
                    url: 'https://www.cnblogs.com/hutuzhu/p/4450850.html',
                    source: '博客圆',
                    arrange: '未整理',
                    number: '查看次数'
                }
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
                    lists: {}
                }
            },
            itemData: [
                {
                    prop: "name",
                    label: "名称",
                    width: '240'
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
            ],
            operationData:[{
                prop: "bottomHostId",
                label: "操作",
                width: '80',
                list:[{
                    name: "详情",
                    type: 'detail',
                    textClass: "text-operation"
                }]
            }]
        }
    },
    components:{
        NavTitle,
        QueryTable,
        BaseTable
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

</style>