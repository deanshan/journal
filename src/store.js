import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// dispatch：含有异步操作，例如向后台提交数据，写法： this.$store.dispatch('mutations方法名',值)

// commit：同步操作，写法：this.$store.commit('mutations方法名',值)

export default new Vuex.Store({
    state: {
        token: ''
    },
    getters: {
    },
    mutations: {
        SET_TOKEN(state, payload) {
            state.token = payload.token
            sessionStorage.setItem('token', payload.token)
        }
    },
    actions: {

    }
})
