export default {
  SET_ID(state, payload) {
    state.id = payload
  },

  SET_BANNERS(state, payload) {
    state.banners = payload
    state.advertisements[state.id].banners = payload
  },

  SET_ADVERTISEMENTS(state, payload) {
    state.advertisements[state.id] = payload
  }
}
