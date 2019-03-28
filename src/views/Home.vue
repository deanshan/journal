<template>
    <div id="home">

        <!-- <Audio></Audio> -->

        <el-container>
            <!-- el-header必须写在这里，否则el-container没有flex-direction(原因待查找) -->
            <el-header height="60px">
                <JHeader></JHeader>
            </el-header>

            <el-container>

                <JSidebar></JSidebar>

                <JMain></JMain>

            </el-container>

        </el-container>

    </div>
</template>

<script>

// import Audio from "@/components/common/Audio.vue"

import JHeader from "@/components/header/JHeader.vue"
import JSidebar from "@/components/aside/JSidebar.vue"
import JMain from "@/components/main/JMain.vue"

export default {
    name: 'home',
    components: {
        // Audio,
        JHeader,
        JSidebar,
        JMain
    }
}
</script>

<style lang="scss" scoped>
#home {
  width: 100%;
  height: 100%;
}
</style>
