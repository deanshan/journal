<template>
    <div id="song-title">
        <a href="javascript:void(0)" @click="$router.go(-1)">返回</a>
        <div class="title">{{this.getTitle}}——{{this.getArtist}}</div>
        <router-link :to="{name: 'lyric'}">歌词</router-link>
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
  }
}
</script>

<style lang="scss" scoped>
#song-title {
    height: 60px;
    background: #ccc;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.title {
  // font-size: .26rem;
  font-family: '隶书';
  // color: rgba(255, 255, 255, 0.8);
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  line-height: 26px;
}
</style>
