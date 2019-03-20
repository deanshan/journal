<template>
    <el-row class="nav-title">
        <el-col :span="20">
            <el-breadcrumb separator="|">
                <el-breadcrumb-item v-for="(title, key) in titles" :key="key">{{ title }}</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        <el-col :span="4" class="reply" v-if="isReply">
            <span class="fa fa-reply" @click="$router.go(-1)">&nbsp;返回</span>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'navTitle',
    props: {
        titles: {
            default: () => [],
            type: Array
        },
        isReply: {
            default: false,
            type: Boolean
        }
    }
}
</script>

<style lang="scss" scoped>
.nav-title {
    margin-bottom: 10px;
    flex-shrink: 0;
    .reply {
        display: flex;
        justify-content: flex-end;
        padding-right: 10px;
        cursor: pointer;
        .fa.fa-reply {
            color: #2090ff;
            font-size: 12px;
        }
    }
}
</style>
<style>
.el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-breadcrumb__inner {
    font-size: 12px;
    color: #666;
    padding: 0 10px;
}
.el-breadcrumb__separator {
    font-weight: 100;
    margin: 0;
    color: #666;
}
</style>

