export default {
  SET_SINGLE_ADVERTISER(state, advertiser) {
    state.singleAdvertiser = advertiser
  },
  SET_ADVERTISERS(state, advertisers) {
    state.advertisers = advertisers
  },
  SET_BANNERS(state, banners) {
    state.banners = banners
  },
  SET_BANNER_PLACES(state, banner_places) {
    state.banner_places = banner_places
  },
  SET_ADVERTISER_ADS(state, ads) {
    state.advertisers.filter(x => x.id === ads.advertiserId).ads = ads
  },
  SET_ADV(state, adv) {
    state.adv = adv
  },
  SET_SERVER_STATUS(state, status) {
    state.server_state = status < 400
  },
  SET_PING(state, time) {
    state.server_ping = time
  },
  SET_USER_STAT(state, count) {
    state.users_count = count
  },
  SET_USER_DELETED(state, count) {
    state.users_deleted = count
  },
  SET_USER_REGISTERED(state, count) {
    state.users_registered = count
  }
}
