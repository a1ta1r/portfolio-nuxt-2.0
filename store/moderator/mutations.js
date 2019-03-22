export default {
  SET_ADVERTISERS(state, payload) {
    state.advertisers = payload
  },
  SET_ADVERTISEMENTS(state, payload) {
    state.advertisements = payload
  },
  ADD_BANNER(state, banner) {
    state.advertisements[0].banners.push(banner) // Мне стыдно, да
  },
  REMOVE_BANNER(state, banner) {
    state.advertisements[0].banners.splice(
      state.advertisements[0].banners.indexOf(banner),
      1
    ) // Мне стыдно, да
  }
}
