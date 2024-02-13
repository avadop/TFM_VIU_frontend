import { createStore } from 'vuex'

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
  }
})

export default store

