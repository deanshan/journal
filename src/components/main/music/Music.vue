<template>
    <div id="music">
        <router-view name="songTitle"></router-view>
        <router-view></router-view>
        <router-view name="playControl"></router-view>
    </div>
    <!-- <router-view name="Myplayer"></router-view> -->

</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'music',
    methods: {
        ...mapActions('list', ['getNewMusic', 'getHotMusic', 'getSutraMusic', 'getLyric'])
    },
    created () {
        this.getNewMusic()
        this.getHotMusic()
        this.getSutraMusic()
        setTimeout(() => {
            this.getLyric()
        }, 500)
    }
}
</script>

<style lang="scss" scoped>

</style>
