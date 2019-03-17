export default {
  load_advertiser({ commit }, id) {
    return this.$axios
      .get(`partners/${id}`)
      .then(result => result.data.advertiser)
      .then(advertiser => {
        commit('SET_SINGLE_ADVERTISER', advertiser)
      })
  },
}
