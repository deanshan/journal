<template>
    <el-main>
        <Audio></Audio>
        <router-view name="songTitle"></router-view>
        <router-view></router-view>
        <router-view name="playControl"></router-view>
    </el-main>
</template>

<script>
import Audio from "@/components/common/Audio.vue"
export default {
    name: 'JMain',
    data() {
        return {

        }
    },
    components: {
        Audio
    }
}
</script>

<style lang="scss" scoped>

</style>
