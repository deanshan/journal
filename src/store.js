import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      collapse_status: false,  //  折叠菜单栏
      search_status: false,    //  打开搜索框
  },
  getters: {},
  mutations: {
      COLLAPSE_STATUS(state, payload) {
        state.collapse_status = payload.collapse_status
      },
      SEARCH_STATUS(state, payload) {
        state.search_status = payload.search_status
      }
  },
  actions: {

  }
})
