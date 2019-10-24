<template>
    <div class="music-cover">
        <router-link
            :to="{name: 'lyric'}"
            class="cover"
            :class="[!paused ? 'cover-animation-running' : 'cover-animation-paused']"
            :style="{'background': `url(${getCover})`}"
        ></router-link>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'PlayCover',
  computed: {
    ...mapState('player', {
      paused: state => state.paused
    }),
    ...mapGetters('list', ['getCover'])
  }
}
</script>
<style lang="scss" scoped>
    @keyframes musiccover {
        from {
            transform: rotate(0deg)
        }
        to {
            transform: rotate(360deg)
        }
    }
    .music-cover {
        display: flex;
        flex: auto;
        align-items: center;
        justify-content: center;
        background: radial-gradient(circle, white 20%, gray 50%, black );
        .cover {
            width: 300px;
            height: 300px;
            border-radius: 50%;
        }
        .cover-animation-running {
            animation: musiccover 8s linear infinite running;
        }
        .cover-animation-paused {
            animation: musiccover 8s linear infinite paused;
        }
    }

</style>
