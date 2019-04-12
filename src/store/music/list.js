import { https } from '@/utils/https.js'
import { isArray } from '@/utils/common.js'

export default {
    namespaced: true,
    state: {
        musicList: {
            newMusic: [],
            hotMusic: [],
            sutraMusic: [],
            favoriteMusic: []
        },
        vkey: "",
        list: 1,  // 对应歌曲类型
        lrc: "",  // 歌词
        currentMusic: parseInt(window.localStorage.getItem("currentMusic")) || 0 // 当前播放的歌曲，即下标所对应的歌曲
    },
    getters: {
        getTitle(state, getters) {

            return isArray(getters.getCurrentList) && getters.getCurrentList[state.currentMusic].data.songname
        },
        getArtist(state, getters) {

            return isArray(getters.getCurrentList) && getters.getCurrentList[state.currentMusic].data.singer[0].name
        },
        getURL(state, getters) {

            return isArray(getters.getCurrentList)
                && (!!state.vkey)
                && `http://dl.stream.qqmusic.qq.com/C400${getters.getCurrentList[state.currentMusic].data.songmid}.m4a?fromtag=38&guid=5931742855&vkey=${state.vkey}`
        },
        getCover(state, getters) {

            return isArray(getters.getCurrentList)
                && `https://y.gtimg.cn/music/photo_new/T002R300x300M000${getters.getCurrentList[state.currentMusic].data.albummid}.jpg?max_age=2592000`
        },
        getCurrentList(state) {
            if (state.list === 0) return state.musicList.newMusic
            if (state.list === 1) return state.musicList.hotMusic
            if (state.list === 2) return state.musicList.sutraMusic
        }
    },
    mutations: {
        // 切换音乐(如自动切换、列表切换、前后切换)
        CHANGE_MUSIC(state) {
            let currentMusic = parseInt(window.localStorage.getItem("currentMusic"))
            if (currentMusic === undefined || currentMusic === null) state.currentMusic === 0
            else state.currentMusic = currentMusic
        },
        // 改变当前音乐列表
        CHANGE_MUSIC_LIST(state, payload) {
            state.list = payload.list
        },
        // deleteMusic列表中删除歌单
        DELETE_MUSIC(state, payload) {
            state.musicList.favoriteMusic.splice(payload.currentMusic, 1)
        },
        ADD_FAVORITE_MUSIC(state, payload) {
            state.musicList.favoriteMusic.push(payload.favoriteMusic)
            state.musicList.favoriteMusic = Array.from(new Set(state.musicList.favoriteMusic))
        },
        // 新歌列表
        GET_NEW_MUSIC(state, response) {
            state.musicList.newMusic = response
        },
        // 热歌列表
        GET_HOT_MUSIC(state, response) {
            state.musicList.hotMusic = response
        },
        // 经典列表
        GET_SUTRA_MUSIC(state, response) {
            state.musicList.sutraMusic = response
        },
        // 获取lrc
        GET_LYRIC(state, response) {
            state.lrc = response
        },
        // 获取vkey
        GET_VKEY(state, response) {
            state.vkey = response
        }
    },
    actions: {
        async getNewMusic(ctx) {
            let url = "/api?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1531113398355"
            return new Promise(resolve => {
                https
                    .get(url)
                    .then(res => {
                        console.log(res)
                        ctx.commit("GET_NEW_MUSIC", res.songlist)
                        resolve()
                    })
            })
        },
        async getHotMusic(ctx) {
            let url = "/api?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=26&_=1531034162798"
            return new Promise(resolve => {
                https
                    .get(url)
                    .then(res => {
                        console.log(res)
                        ctx.commit("GET_HOT_MUSIC", res.songlist)
                        resolve()
                    })
            })
        },
        async getSutraMusic(ctx) {
            let url = "/api?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=36&_=1531059472453"
            return new Promise(resolve => {
                https
                    .get(url)
                    .then(res => {
                      console.log(res)
                        ctx.commit("GET_SUTRA_MUSIC", res.songlist)
                        resolve()
                    })
            })
        },
      getLyric(ctx) {
          console.log(ctx)
          let songmid = ctx.getters.getCurrentList[ctx.state.currentMusic].data.songmid
          let url = `/lyric?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&songmid=${songmid}&platform=yqq&hostUin=0&nobase64=1&needNewCode=0&categoryId=10000000&pcachetime=1531121845607`
          https
              .get(url)
              .then(res => {
                  console.log(res)
                  ctx.commit("GET_LYRIC", res.lyric)
              })
      },
      getVKey(ctx) {
          let songmid = ctx.getters.getCurrentList[ctx.state.currentMusic].data.songmid
          const data = Object.assign({}, {
              callback: 'musicJsonCallback',
              loginUin: 3051522991,
              format: 'jsonp',
              platform: 'yqq',
              needNewCode: 0,
              cid: 205361747,
              uin: 3051522991,
              guid: 5931742855,
              songmid: songmid,
              filename: `C400${songmid}.m4a`
          })
          return new Promise(resolve => {
              https
                  .get('/vKey',data)
                  .then(res => {
                      console.log(res)
                      let num1 = res.indexOf('(')
                      let num2 = res.indexOf(')')
                      let result = JSON.parse(res.substring(num1 + 1, num2))
                      let vkey = result.data.items[0].vkey
                      ctx.commit("GET_VKEY", vkey)
                      resolve()
                  })
          })
      }
    }
}
