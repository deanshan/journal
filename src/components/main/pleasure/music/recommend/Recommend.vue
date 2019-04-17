<template>
    <div class="recommend h100" ref="recommend">

        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="newMusic">
                <ul ref="newMusic">
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                  <li>123</li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="配置管理" name="hostMusic">host</el-tab-pane>
            <el-tab-pane label="角色管理" name="sutraMusic">sutra</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    data () {
      return {
        activeName: 'newMusic',
      }
    },
    components: {

    },
    computed: {
      ...mapState('player', {
        paused: state => state.paused
      }),
      ...mapState('list', {
        currentMusic: state => state.currentMusic
      }),
      ...mapGetters('list', ['getCurrentList']),
      musicList () {
        return this.getCurrentList.slice(0, this.num)
      }
    },
  watch: {
    'isTab' (newVal) {
      this.CHANGE_MUSIC_LIST({list: newVal})
    }
  },
  methods: {
    ...mapMutations('player', ['PLAY_PAUSE']),
    ...mapMutations('list', ['CHANGE_MUSIC', 'CHANGE_MUSIC_LIST', 'ADD_FAVORITE_MUSIC']),
    ...mapActions('list', ['getLyric']),
    handleClick(tab, event) {
        console.log(tab, event);
    },
    listMusic (k) {
      window.localStorage.setItem('currentMusic', k)
      this.CHANGE_MUSIC()
      this.PLAY_PAUSE({paused: false})
      this.getLyric()
      this.$router.push({ path: '/player' })
    },
    load () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.num += 10
      }, 200)
    },
    play (k) {
      if (k === this.currentMusic) {
        this.paused ? this.PLAY_PAUSE({paused: false}) : this.PLAY_PAUSE({paused: true})
        this.playIcon = this.paused
      } else {
        this.PLAY_PAUSE({paused: false})
        this.playIcon = false
      }
      window.localStorage.setItem('currentMusic', k)
      this.CHANGE_MUSIC()
      this.getLyric()
    },
    favorite (list) {
      this.ADD_FAVORITE_MUSIC({favoriteMusic: list})
    }
  },
  mounted () {
      console.log(this.$refs.newMusic)
      this.$refs.newMusic.addEventListener('scroll', (e) => {
          console.log(e)
          let scrollTop = this.$refs.recommend.scrollTop

          console.log(scrollTop)
      })
  }
}
</script>

<style scoped>
.el-tabs {
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>

<style lang="scss" scoped>
.recommend {
  flex: auto;
}
</style>
