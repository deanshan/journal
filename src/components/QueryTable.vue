<template>
    <!-- 查询 -->
    <div class="query-content">
        <!-- 刷新 -->
        <!-- <el-button type="primary" class="btn-refresh" icon="el-icon-refresh" @click="refresh"></el-button> -->
        <el-form :inline="true" :model="queryTerms" class="demo-form-inline">
            <el-form-item>
                <el-input
                    size="small"
                    v-model="queryTerms.name.value"
                    :placeholder="queryTerms.name.label"
                    @keyup.enter.native="search('queryTerms')"
                >
                    <template slot="prepend">{{ queryTerms.name.label }}</template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-select
                    size="small"
                    v-model="queryTerms.arrange['value']"
                    :placeholder="queryTerms.arrange.label"
                    @change="search('queryTerms')"
                >
                    <el-option label="全部" value=""></el-option>
                    <el-option
                        v-for="(arrange, key) in queryTerms.arrange.lists"
                        :key="key"
                        :label="arrange.label"
                        :value="arrange.value"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <div class="filter-container">
            <el-checkbox-group v-model="checkboxVal">
                <el-checkbox label="type">
                    类型
                </el-checkbox>
                <el-checkbox label="details">
                    详情
                </el-checkbox>
            </el-checkbox-group>
        </div>
    </div>
</template>

<script>

export default {
    name: "queryTable",
    data() {
        return {
            checkboxVal: [], // 默认不选中
            formTheadOptions: ['名称', '类型', '详情','来源','是否整理','阅读数'],
            formThead: ['名称','来源','是否整理','阅读数'], // 默认显示的表头
        }
    },
    props: {
        queryTerms: {
            default: () => {},
            type: Object
        }
    },
    methods: {
        refresh() {
            this.$emit('tableRefresh', '')
        },
        search(form) {
            console.log(form)
        }
    }
}
</script>

<style lang="scss" scoped>
.query-content {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    // justify-content: space-between;
}
</style>