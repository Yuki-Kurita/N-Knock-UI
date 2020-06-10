import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

// 以下を外部でも使えるようにする
export default new Vuex.Store({
  state: {
    email: '',
    userName: '',
    auth: false,
    list: {},
    knocks: [],
    knockLists: []
  },
  getters,
  actions,
  mutations,
  strict: process.env.NODE_ENV !== 'production'
})
