import Vuex from 'vuex'
import admin from './admin/admin'
import client from './client/client'
import general from './general/general'
import advertiser from './advertiser/advertiser'
import moderator from './moderator/moderator'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      admin,
      client,
      general,
      advertiser,
      moderator
    }
  })
}

export default createStore
