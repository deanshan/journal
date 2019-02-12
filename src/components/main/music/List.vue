<template>
  <div class="music-list">
    <div class="list-title">
      <h1>播放列表</h1>
      <span>清空</span>
    </div>
    <ul>
      <li
        v-for="(list, k) in favoriteMusic"
        :key="k"
        :class="[k===currentMusic ? 'active' : '']"
      >
        <span @click="listMusic(k)">{{ list.data.songname }} {{ list.data.singer[0].name }}</span>
        <span @click="deleteMusic(k)"> X </span>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'List',
  data () {
    return {
      musicData: []
    }
  },
  computed: {
    ...mapState('player', {
      paused: state => state.paused
    }),
    ...mapState('list', {
      currentMusic: state => state.currentMusic,
      favoriteMusic: state => state.musicList.favoriteMusic
    })
  },
  methods: {
    ...mapMutations('player', ['PLAY_PAUSE']),
    ...mapMutations('list', ['CHANGE_MUSIC', 'DELETE_MUSIC']),
    listMusic (k) {
      window.localStorage.setItem('currentMusic', k)
      this.CHANGE_MUSIC()
      this.PLAY_PAUSE({paused: false})
    },
    deleteMusic (k) {
      if (k < this.currentMusic) {
        window.localStorage.setItem('currentMusic', this.currentMusic - 1)
        this.CHANGE_MUSIC({currentMusic: this.currentMusic - 1})
      }
      this.DELETE_MUSIC({currentMusic: k})
    }
  }
}
</script>
<style lang="scss" scoped>
.music-list {
  flex: auto;
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .list-title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: .5rem;
    position: relative;
    border-bottom: 1px solid gold;
    span {
      position: absolute;
      top: .15rem;
      right: .1rem;
      font-size: .16rem;
    }
  }
  li {
    font-size: .16rem;
    padding: .15rem .1rem;
    position: relative;
    border-bottom: 1px solid gold;
    display: flex;
    justify-content: space-between;
  }
  .active {
    color: red;
  }
}
</style>
