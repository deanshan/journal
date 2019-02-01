import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      collapse_status: false,   //  折叠菜单栏，默认打开
      search_status: false,     //  打开搜索框，默认关闭
      user_list_status: false,  //  用户信息列表，默认隐藏
  },
  getters: {},
  mutations: {
      COLLAPSE_STATUS(state, payload) {
        state.collapse_status = payload.collapse_status
      },
      SEARCH_STATUS(state, payload) {
        state.search_status = payload.search_status
      },
      USER_LIST_STATUS(state, payload) {
        state.user_list_status = payload.user_list_status
      }
  },
  actions: {

  }
})
