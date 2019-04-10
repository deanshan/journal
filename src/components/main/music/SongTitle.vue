<template>
  <div>
    <mu-appbar style="width: 100%;" color="grey700">
      <mu-button icon slot="left" @click="back">
        <mu-icon value="reply"></mu-icon>
      </mu-button>
      <div class="title">{{this.getTitle}}</div>
      <div class="artist">{{this.getArtist}}</div>
      <mu-button flat slot="right" :to="{name: 'lyric'}">
        <mu-icon value="music_note" color="red"></mu-icon>
        歌词
      </mu-button>
    </mu-appbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SongTitle',
  computed: {
    ...mapGetters('list', ['getTitle', 'getArtist'])
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.mu-appbar-title {
  line-height: 27px;
}
.artist {
  font-family: '隶书';
  color: rgba(255, 255, 255, 0.5);
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  line-height: 26px;
}
.title {
  font-size: .26rem;
  font-family: '隶书';
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  line-height: 26px;
}
</style>
