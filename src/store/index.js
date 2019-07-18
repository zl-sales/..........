import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import app from './module/app'
import fans from './module/fans'
import notice from './module/notice'
import earnings from './module/earnings'
import release from './module/release'
import homepage from './module/homepage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    fans,
    notice,
    earnings,
    release,
    homepage
  }
})
