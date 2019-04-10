<template>
  <div class="music-logo">
    <router-link
      :to="{name: 'lyric'}"
      class="logo"
      :class="[!this.paused ? 'logo-animation-running' : 'logo-animation-paused']"
      :style="{background: `url(${this.getCover})`}"
    ></router-link>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Play',
  computed: {
    ...mapState('player', {
      paused: state => state.paused
    }),
    ...mapGetters('list', ['getCover'])
  }
}
</script>
<style lang="scss" scoped>
  @keyframes musiclogo {
    from {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(360deg)
    }
  }
  .music-logo {
    height: 100%;
    display: flex;
    flex: auto;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle, white 20%, gray 50%, black );
    .logo {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      // background-repeat: no-repeat;
      // background-size: auto;
    }
    .logo-animation-running {
      animation: musiclogo 8s linear infinite running;
    }
    .logo-animation-paused {
      animation: musiclogo 8s linear infinite paused;
    }
  }

</style>
