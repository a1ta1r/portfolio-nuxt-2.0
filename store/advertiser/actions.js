export default {
  load_advertiser({ commit }, id) {
    return this.$axios
      .get(`partners/${id}`)
      .then(result => result.data.advertiser)
      .then(advertiser => {
        commit('SET_SINGLE_ADVERTISER', advertiser)
      })
  },
  set_id({ commit }, id) {
    commit('SET_ID', id)
  },
  load_advertisements({ commit }, id) {
    return this.$axios.get(`partners/${id}/promotions`).then(result => {
      if (result.status === 200) {
        commit('SET_ADVERTISEMENTS', result.data.advertisements)
      }
    })
  },
  load_banners({ commit }, id) {
    return this.$axios.get(`promotions/${id}/banners`).then(result => {
      if (result.status === 200) {
        commit('SET_BANNERS', result.data.banners)
      }
    })
  },
  view_banner({ commit }, id) {
    return (this.$axios.put(`banners/${id}/views`).then = () => {
      console.dir('Viewd!')
    })
  },
  click_banner({ commit }, id) {
    return (this.$axios.put(`banners/${id}/clicks`).then = () => {
      console.dir('Clicked!')
    })
  }
}
