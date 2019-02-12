export default {
  SET_PROCESSING(state, payload) {
    state.processing = payload
  },
  SET_ROUTE(state, payload) {
    state.currentPage = payload
  },
  SET_AUTHORIZED(state, payload) {
    state.isAuthorized = payload
  }
}
