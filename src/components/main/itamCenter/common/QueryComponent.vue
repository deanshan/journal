<template>
    <!-- 搜索 -->
    <div class="query-content">
        <el-button type="default" icon="fa fa-refresh" @click="refresh" class="btn-refresh"></el-button>
        <el-button type="primary" @click="add" class="btn-add" size="small">添加</el-button>
        <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="searchInfo.value" :placeholder="searchInfo.label" size="small">
                    <template slot="prepend">{{ searchInfo.label }}</template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="onQuery" size="small" class="btn-line-height">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import NavTitle from '@/components/common/NavTitle'

    export default {
        name: "queryComponent",
        props:{
            isDownload:{
                type:Boolean,
                defalut:true
            },
            searchInfo:{
                default: () => {},
                type: Object
            }
        },
        methods:{
            refresh(){
                this.$parent.tableRefresh()
            },
            onQuery(){
                this.$parent.onSubmit()
            },
            add(){
                this.$parent.add()
            }
        }
    }
</script>

<style scoped>
    .demo-form-inline{
        float: right;
    }
</style>