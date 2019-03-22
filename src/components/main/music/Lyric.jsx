// import { parseLyric } from '@/utils/parseLyric'
// import { mapState, mapGetters } from 'vuex'
// import BScroll from 'better-scroll'
// import { eventBus } from '@/utils/eventBus'

// import '@/sass/lyric.scss'

// export default {
//   name: 'Lyric',
//   data () {
//     return {
//       timeDif: 0,
//       curlrc: 0
//     }
//   },
//   computed: {
//     ...mapState('player', {
//       paused: state => state.paused,
//       currentTime: state => state.currentTime
//     }),
//     ...mapState('list', {
//       lrc: state => state.lrc
//     }),
//     ...mapGetters('list', ['getCover']),
//     parseLrc () {
//       return parseLyric(this.lrc)
//     }
//   },
//   render () {
//     let curClass = 'cur'
//     // 遍历歌词生成对应li
//     let lrcList = this.parseLrc.map((lrc, index) => {
//       if (lrc[0] <= this.currentTime && index >= this.curlrc) {
//         this.curlrc = index
//         curClass = 'cur'
//         if (index > 0) this.timeDif = this.parseLrc[index][0] - this.parseLrc[index - 1][0]
//       } else {
//         curClass = ''
//       }
//       return (
//         <li
//           ref='li'
//           class={ curClass }
//           key={index}
//         > { lrc[1] } </li>
//       )
//     })
//     return (
//       <div ref="lyric" class="music-lrc">
//         <ul ref='ul'>
//           {lrcList}
//         </ul>
//       </div>
//     )
//   },
//   methods: {
//     lrcTimer (t) {
//       if (this.curlrc > 5) {
//         let curLi = this.$refs.ul.children[this.curlrc - 5]
//         setTimeout(() => {
//           // 滚动到目标元素，即当前高亮li
//           this.lrcScroll.scrollToElement(curLi, t)
//         }, t)
//       } else {
//         // 后退到当前行数小于5时，回到最顶部
//         this.lrcScroll.scrollTo(0, 0, 800)
//       }
//     }
//   },
//   mounted () {
//     this.$nextTick(() => {
//       this.lrcScroll = new BScroll(this.$refs.lyric, {})
//       eventBus.$on('back', val => {
//         if (val) {
//           this.lrcScroll.scrollTo(0, 0, 200)
//         }
//       })
//     })
//   },
//   watch: {
//     'timeDif' (newVal) {
//       // this.lrcScroll必须在DOM生成之后才能使用
//       this.$nextTick(() => {
//         this.lrcTimer(newVal + 100)
//       })
//     },
//     'currentTime' (newVal, old) {
//       if (old - newVal > 1) {
//         this.curlrc = 0
//       }
//     }
//   }
// }
