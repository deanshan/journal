<template>
  <div class="recommend">
      <!-- tab页    下拉加载 -->
    <div class="nav">
      <mt-button size="small" @click.native.prevent="active = 'tab-container1'">tab 1</mt-button>
      <mt-button size="small" @click.native.prevent="active = 'tab-container2'">tab 2</mt-button>
      <mt-button size="small" @click.native.prevent="active = 'tab-container3'">tab 3</mt-button>
    </div>
    <div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
        <mt-tab-container-item id="tab-container1">
          <mt-cell v-for="n in 10" :key="n" title="tab-container 1"></mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container2">
          <mt-cell v-for="n in 5" :key="n" title="tab-container 2"></mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container3">
          <mt-cell v-for="n in 7" :key="n" title="tab-container 3"></mt-cell>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
  <!-- <mu-flex class="index" direction="column">
    <router-view name="Audio"></router-view>
    <mu-flex class="header" justify-content="center" align-items="center" ref="header">
      <mu-appbar style="width: 100%;" color="primary">
        <mu-button icon slot="left">
          <mu-icon size="36" value="queue_music" color="red"></mu-icon>
        </mu-button>
        Music
        <mu-button icon slot="right">
          <mu-icon size="36" value="list" color="red"></mu-icon>
        </mu-button>
      </mu-appbar>
    </mu-flex>
    <mu-flex class="main" direction="column" ref="main">
      <mu-container>
        <mu-tabs :value.sync="isTab" color="green" indicator-color="yellow" full-width :style="styleObj">
          <mu-tab>
            <mu-ripple color="red" :opacity="0.3">
              新歌
            </mu-ripple>
          </mu-tab>
          <mu-tab>
            <mu-ripple color="red" :opacity="0.3">
              热歌
            </mu-ripple>
          </mu-tab>
          <mu-tab>
            <mu-ripple color="red" :opacity="0.3">
              经典
            </mu-ripple>
          </mu-tab>
        </mu-tabs>
        <div v-for="(item, key) in list" :key="key">
          <mu-slide-left-transition>
            <div v-show="item === isTab">
              <mu-load-more :loading="loading" @load="load">
                <mu-list
                  textline="two-line"
                  v-for="(list, k) in musicList"
                  :key="k"
                >
                  <mu-list-item avatar :ripple="false" button>
                    <mu-list-item-action >
                      <mu-checkbox
                        color="yellow700"
                        :value="'Checkbox ' + k"
                        v-model="checkbox.value"
                        uncheck-icon="star_border"
                        checked-icon="star"
                        @click="favorite(list)"
                      ></mu-checkbox>
                    </mu-list-item-action>
                    <mu-list-item-content @click="listMusic(k)">
                      <mu-list-item-title>{{list.data.songname}}</mu-list-item-title>
                      <mu-list-item-sub-title>{{list.data.singer[0].name}}</mu-list-item-sub-title>
                    </mu-list-item-content>
                    <mu-list-item-action >
                      <mu-radio
                        color="red"
                        :value="'radio' + k"
                        v-model="radio.value"
                        :checked-icon="playIcon ? 'pause_circle_filled' : 'play_circle_filled'"
                        uncheck-icon="pause_circle_filled"
                        @click="play(k)"
                      ></mu-radio>
                    </mu-list-item-action >
                  </mu-list-item>
                  <mu-divider></mu-divider>
                </mu-list>
              </mu-load-more>
            </div>
          </mu-slide-left-transition>
        </div>
      </mu-container>
    </mu-flex>
    <mu-flex align-items="center" class="footer">
      <mu-container>
        <mu-bottom-nav :value.sync="shift" shift>
          <mu-bottom-nav-item value="movies" title="歌单" icon="ondemand_video"></mu-bottom-nav-item>
          <mu-bottom-nav-item value="music" title="播放" icon="music_note" :to="{path: '/player'}"></mu-bottom-nav-item>
          <mu-bottom-nav-item value="books" title="我的" icon="books"></mu-bottom-nav-item>
        </mu-bottom-nav>
      </mu-container>
    </mu-flex>
  </mu-flex> -->
</template>

<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data () {
    return {
      active: 'tab-container1',
      list: [0, 1, 2],
      isTab: 0,
      loading: false,
      num: 10,
      styleObj: {},
      shift: 'music',
      playIcon: false,
      radio: {
        value: []
      },
      checkbox: {
        value: []
      }
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
    // this.$refs.main.onscroll = (e) => {
    //   let top = this.$refs.main.scrollTop
    //   if (top >= 50) {
    //     this.styleObj = {
    //       position: 'absolute',
    //       top: 0,
    //       height: '56px'
    //     }
    //   } else {
    //     this.styleObj = {}
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  flex: auto;
}
.item {
    display: inline-block;
  }

  .nav {
    padding: 10px;
  }

  .link {
    color: inherit;
    padding: 20px;
    display: block;
  }
.index {
  width: 100vw;
  height: 100vh;
  .header {
    width: 100vw;
    background-color: #e0e0e0;
  }
  .main {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .container {
      padding: 0;
    }
  }
  .footer {
    width: 100%;
    font-size: 20px;
    background: #ccc;
    .container {
      padding: 0;
    }
  }
}
::-webkit-scrollbar {
    display: none;
}
</style>
