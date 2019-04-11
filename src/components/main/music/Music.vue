<template>
    <router-view></router-view>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'Music',
    methods: {
        ...mapActions('list', ['getNewMusic', 'getHotMusic', 'getSutraMusic', 'getLyric','getVKey'])
    },
    created () {
        this.getNewMusic()
        this.getHotMusic()
        this.getSutraMusic()
        setTimeout(() => {
            this.getLyric()
            this.getVKey()
        }, 500)
    }
}
</script>

<style lang="scss" scoped>
</style>
