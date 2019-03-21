export default {
  SET_ADVERTISERS(state, payload) {
    state.advertisers = payload
  },
  SET_ADVERTISEMENTS(state, payload) {
    state.advertisements = payload
  },
  ADD_BANNER(state, banner) {
    state.advertisements.banners.push(banner.banner)
  }
}
