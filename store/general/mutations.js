export default {
  SET_PROCESSING(state, payload) {
    state.processing = payload
  },
  SET_ROUTE(state, payload) {
    state.currentPage = payload
  }
}
