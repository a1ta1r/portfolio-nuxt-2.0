export default {
  load_advertisers({ commit }) {
    return this.$axios.get('partners').then(result => {
      if (result.status === 200) {
        commit('SET_ADVERTISERS', result.data.advertisers)
      }
    })
  },
  load_advertisements({ commit, dispatch }, id) {
    dispatch('general/set_processing', true, { root: true })
    return this.$axios.get(`partners/${id}/promotions`).then(result => {
      if (result.status === 200) {
        let advs = result.data.advertisements
        for (let i = 0; i < advs.length; i++) {
          advs[i].banners = []
          this.$axios.get(`promotions/${advs[i].id}/banners`).then(res => {
            if (res.status === 200) advs[i].banners = res.data.banners
          })
        }
        commit('SET_ADVERTISEMENTS', result.data.advertisements)
      }
      dispatch('general/set_processing', false, { root: true })
    })
  },
  add_banner({ commit }, banner) {
    return this.$axios.post('banners', banner).then(result => {
      if (result.status === 200) {
        commit('ADD_BANNER', banner)
      }
    })
  }
}
