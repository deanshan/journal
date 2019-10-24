<template>
    <div id="home">

        <Audio></Audio>

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
import { mapActions } from 'vuex'

import Audio from "@/components/Audio.vue"

import JHeader from "@/views/header/JHeader.vue"
import JSidebar from "@/views/aside/JSidebar.vue"
import JMain from "@/views/main/JMain.vue"

export default {
    name: 'Home',
    components: {
        Audio,
        JHeader,
        JSidebar,
        JMain
    },
    methods: {
        ...mapActions('list', ['getNewMusic', 'getHotMusic', 'getSutraMusic', 'getLyric','getVKey'])
    },
    async created () {
        await this.getNewMusic()
        await this.getHotMusic()
        await this.getSutraMusic()
        await this.getVKey()
        this.getLyric()
    }
}
</script>

<style lang="scss" scoped>
#home {
  width: 100%;
  height: 100%;
}
</style>
