<template>
    <!-- 查询 -->
    <div class="query-content">
        <!-- 刷新 -->
        <el-button type="default" class="btn-refresh" icon="fa fa-refresh" @click="refresh"></el-button>

        <el-form :inline="true" :model="resourceInfo" class="demo-form-inline">
            <el-form-item>
                <el-input v-model=resourceInfo.resourceId.value :placeholder=resourceInfo.resourceId.label size="small">
                    <template slot="prepend">{{ resourceInfo.resourceId.label }}</template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="resourceInfo.name['value']" :placeholder=resourceInfo.name.label size="small">
                    <template slot="prepend">{{ resourceInfo.name.label }}</template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-if="isShowStatus" v-model="resourceInfo.status['value']" :placeholder=resourceInfo.status.label size="small">
                    <el-option label="状态" value=""></el-option>
                    <el-option
                        v-for="(status, key) in resourceInfo.status.lists"
                        :key="key"
                        :label=status.label
                        :value=status.value
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
        resourceInfo: {
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
            let status = ''
            if(this.resourceInfo.status){
                status = this.resourceInfo.status.value
            }
            this.$emit('onExport',this.resourceInfo.resourceId.value,this.resourceInfo.name.value,status)
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