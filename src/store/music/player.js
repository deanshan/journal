export default {
  namespaced: true,
  state: {
    isShowSidebar: false,
    paused: true, // 播放暂停，默认true暂停
    volume: 0.3,
    duration: 0, // 当前歌曲总时长
    currentTime: 0, // 当前歌曲播放进度，即当前播放所在位置
    playMode: "shunxubofangtubiao" // 播放模式，默认order为顺序播放
  },
  getters: {
    // 获取控件切换音乐的索引值
    getCurrentIndex: (state, getters, rootState, rootGetters) => payload => {
      let currentMusic = rootState.list.currentMusic;
      let length = rootGetters["list/getCurrentList"].length;
      let playMode = state.playMode;
      if (
        playMode === "shunxubofangtubiao" ||
        playMode === "danquxunhuan" ||
        playMode === "xunhuan"
      ) {
        if (payload.type === "prev") {
          currentMusic = (currentMusic - 1 + length) % length;
        } else {
          currentMusic = (currentMusic + 1) % length;
        }
      } else {
        /* 随机播放 */
        if (length > 1) {
          let randomMusic = currentMusic => {
            let newIndex = Math.floor(Math.random() * length);
            if (newIndex === currentMusic) {
              return randomMusic(currentMusic);
            } else {
              return newIndex;
            }
          };
          currentMusic = randomMusic(currentMusic);
        }
      }
      window.localStorage.setItem("currentMusic", currentMusic);
      return currentMusic;
    }
  },
  mutations: {
    // playPause控制播放暂停
    PLAY_PAUSE(state, payload) {
      state.paused = payload.paused;
    },
    CHANGE_VOLUME(state, payload) {
      state.volume = payload.volume;
    },
    // getDuration获取并设置总时长
    GET_DURATION(state, payload) {
      state.duration = payload.duration;
    },
    // getCurrentTime获取并设置当前播放位置
    GET_CURRENTTIME(state, payload) {
      state.currentTime = payload.currentTime;
    },
    // changeProgress改变当前播放位置
    CHANGE_PROGRESS(state, payload) {
      state.currentTime = payload.progress;
    },
    // setPlayMode改变播放模式
    SET_PLAY_MODE(state) {
      let newMode = "";
      switch (state.playMode) {
        case "shunxubofangtubiao":
          newMode = "danquxunhuan";
          break;
        case "danquxunhuan":
          newMode = "xunhuan";
          break;
        case "xunhuan":
          newMode = "suijibofang";
          break;
        case "suijibofang":
          newMode = "shunxubofangtubiao";
          break;
      }
      state.playMode = newMode;
    }
  }
};
