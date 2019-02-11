export default {
  set_route({ commit }, payload) {
    commit('SET_ROUTE', payload)
  },
  set_processing({ commit }, payload) {
    commit('SET_PROCESSING', payload)
  }
}
