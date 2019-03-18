export default {
  SET_ID(state, payload) {
    state.id = payload
  },

  // TODO remove mutations with same name from admin store
  SET_BANNERS(state, payload) {
    state.banners = payload
    state.advertisements[0].banners = payload //костель
  },

  SET_ADVERTISEMENTS(state, payload) {
    state.advertisements = payload
  }
}
