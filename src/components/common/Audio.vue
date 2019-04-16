<template>
    <audio
        ref="audio"
        :src="getURL"
        @loadedmetadata="loadedmetadata"
        @timeupdate="timeupdate"
    ></audio>
</template>

<script>
import { eventBus } from '@/utils/eventBus'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Audio',
  computed: {
    audio () {
        return this.$refs.audio
    },
    ...mapState('player', {
        paused: state => state.paused,
        volume: state => state.volume,
        playMode: state => state.playMode
    }),
    ...mapState('list', {
        currentMusic: state => state.currentMusic
    }),
    ...mapGetters('list', ['getURL', 'getCurrentList'])
  },
  watch: {
      'paused' () {
          this.playPause()
      },
      'volume' (newVal) {
          this.changeVolume(newVal)
      }
  },
  methods: {
      ...mapMutations('player', [
          'PLAY_PAUSE',
          'GET_DURATION',
          'GET_CURRENTTIME'
      ]),
      ...mapMutations('list', [
          'CHANGE_MUSIC'
      ]),
      ...mapActions('list', ['getLyric']),
      playPause () {
          this.paused ? this.audio.pause() : this.audio.play()
      },
      changeVolume (volume) {
          this.audio.volume = volume
      },
    changeCurrentTime () {
        eventBus.$on('changeCurrentTime', val => {
            this.audio.currentTime = val
        })
    },
    loadedmetadata () {
       this.GET_DURATION({duration: this.audio.duration})
    },
    timeupdate () {
        this.GET_CURRENTTIME({currentTime: this.audio.currentTime})
        if (this.audio.ended) {
            // 切换歌词后的位置
            eventBus.$emit('back', true)
            let currentMusic = this.currentMusic
            if (this.playMode === 'order') {
              if (currentMusic === this.getCurrentList.length) {
                this.audio.pause()
                this.audio.load()
                this.PLAY_PAUSE({ paused: true })
              } else {
                currentMusic++
                window.localStorage.setItem('currentMusic', currentMusic)
                this.CHANGE_MUSIC({ currentMusic })
                this.getLyric()
              }
            } else if (this.playMode === 'single') {
              this.audio.load()
              this.audio.play()
            } else if (this.playMode === 'circle') {
              currentMusic++
              if (currentMusic === this.getCurrentList.length) {
                currentMusic = 0
              }
              window.localStorage.setItem('currentMusic', currentMusic)
              this.CHANGE_MUSIC({ currentMusic })
              this.getLyric()
            } else if (this.playMode === 'random') {
              let randomMusic = (currentMusic) => {
                let newIndex = Math.floor(Math.random() * this.getCurrentList.length)
                if (newIndex === currentMusic) {
                  return randomMusic(currentMusic)
                } else {
                  return newIndex
                }
              }
              window.localStorage.setItem('currentMusic', randomMusic(currentMusic))
              this.CHANGE_MUSIC({currentMusic: randomMusic(currentMusic)})
              this.getLyric()
            }
        }
    }
  },
  mounted () {
      this.audio.oncanplay = () => {
          !this.paused && this.audio.play()
      }
      this.changeCurrentTime()
  }
}
</script>
