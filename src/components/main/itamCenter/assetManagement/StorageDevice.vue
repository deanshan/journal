<template>
    <div class="operation-main-content">
        <!-- 导向 -->
        <NavTitle :titles="[]"></NavTitle>
        <!-- 主体 -->
        <div class="main-content">
            <!-- 查询 -->
            <div class="search-content">

            </div>
            <!-- 表格 -->
            <div class="table-content">

            </div>
        </div>
    </div>
</template>

<script>
    import NavTitle from '@/components/common/NavTitle'

    export default {
        name: "storageDevice",
        data() {
            return {}
        },
        components: {
            NavTitle
        }
    }
</script>

<style scoped>

</style>