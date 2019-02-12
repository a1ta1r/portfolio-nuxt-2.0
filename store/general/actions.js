export default {
  set_route({ commit }, payload) {
    commit('SET_ROUTE', payload)
  },
  set_processing({ commit }, payload) {
    commit('SET_PROCESSING', payload)
  },
  set_authorized({ commit }, payload) {
    console.log('watafuck')
    commit('SET_AUTHORIZED', payload)
  }
}
