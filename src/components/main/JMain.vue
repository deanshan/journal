<template>
    <el-main>
        <Audio></Audio>
        <router-view name="songTitle"></router-view>
        <router-view></router-view>
        <router-view name="playControl"></router-view>
    </el-main>
</template>

<script>
import { mapActions } from 'vuex'
import Audio from "@/components/common/Audio.vue"
export default {
    name: 'JMain',
    data() {
        return {

        }
    },
    components: {
        Audio
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

</style>
