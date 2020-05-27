export const state = () => ({
  started: false,
})

export const mutations = {
  setStarted (state, val) {
    state.started = val
  },
}

export const actions = {
  startFakeNewsQuiz ({ commit }) {
    commit('setStarted', true)
  },
}

export const getters = {
  hasStarted: state => state.started,
}
