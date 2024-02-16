import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const store = createStore({
  state () {
    return {
      loggedUser: null
    }
  },
  mutations: {
    saveLoggedUser (state, id) {
      state.loggedUser = id
    },
    removeLoggedUser(state) {
      state.loggedUser = null
    }
  },
  getters: {
    getLoggedUser: (state) => state.loggedUser
  },
  plugins: [vuexLocal.plugin]
})

export default store

