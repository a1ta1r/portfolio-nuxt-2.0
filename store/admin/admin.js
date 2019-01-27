// import state from './state'
import actions from './actions'
import mutations from './mutations'

const state = {
  server_ping: 0,
  advertisers: [],
  banners: [],
  banner_places: [],
  adv: [],
  server_state: true,
  singleAdvertiser: {},
  users_count: [],
  users_registered: [],
  users_deleted: []
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
