<template>
    <div id="j-main">
        <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="searchData">
        </el-input>

        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'main',
    data() {
        return {
            searchData: ''
        }
    }
}
</script>

<style lang="scss" scoped>
#j-main {
    flex: auto;
}
</style>
