<template>
    <!-- 查询 -->
    <div class="query-content">
        <!-- 刷新 -->
        <el-button type="default" class="btn-refresh" icon="fa fa-refresh" @click="refresh"></el-button>

        <el-form :inline="true" :model="queryTerms" class="demo-form-inline">
            <el-form-item>
                <el-input v-model=queryTerms.name.value :placeholder=queryTerms.name.label size="small">
                    <template slot="prepend">{{ queryTerms.name.label }}</template>
                </el-input>
            </el-form-item>
            <!-- <el-form-item>
                <el-input v-model="queryTerms.name['value']" :placeholder=queryTerms.name.label size="small">
                    <template slot="prepend">{{ queryTerms.name.label }}</template>
                </el-input>
            </el-form-item> -->
            <el-form-item>
                <el-select v-if="isShowStatus" v-model="queryTerms.arrange['value']" :placeholder=queryTerms.arrange.label size="small">
                    <el-option label="状态" value=""></el-option>
                    <el-option
                        v-for="(arrange, key) in queryTerms.arrange.lists"
                        :key="key"
                        :label=arrange.label
                        :value=arrange.value
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="small" class="btn-line-height">查询</el-button>
                <el-button type="primary" icon="fa fa-download" @click="onExport" size="small" plain class="btn-line-height">&nbsp;报表</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

export default {
    name: "queryTable",
    data() {
        return {

        }
    },
    props: {
        isShowStatus: {
            default: true,
            type: Boolean
        },
        queryTerms: {
            default: () => {},
            type: Object
        }
    },
    methods: {
        refresh() {
            this.$emit('tableRefresh', '')
        },
        onSubmit() {
            this.$emit('onSubmit')
        },
        onExport() {
            this.$emit('onExport')
        }
    }
}
</script>

<style lang="scss" scoped>
.query-content {
    display: flex;
    justify-content: space-between;
    padding: 10px 10px 10px 20px;
}
</style>