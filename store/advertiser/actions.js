export default {
  load_advertiser({ commit }, id) {
    return this.$axios
      .get(`partners/${id}`)
      .then(result => result.data.advertiser)
      .then(advertiser => {
        commit('SET_SINGLE_ADVERTISER', advertiser)
      })
  },
  load_advertisements({ commit }, id) {
    return this.$axios.get(`partners/${id}/promotions`).then(result => {
      if (result.status === 200) {
        commit('SET_ADVERTISEMENTS', result.data)
      }
    })
  },
  load_banners({ commit }, id) {
    return this.$axios.get(`promotions/${id}/banners`).then(result => {
      if (result.status === 200) {
        commit('SET_BANNERS', id, result.data)
      }
    })
  }
}
