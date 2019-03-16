import Vuex from 'vuex'
import admin from './admin/admin'
import client from './client/client'
import general from './general/general'
import advertiser from './advertiser/advertiser'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      admin,
      client,
      general,
      advertiser
    }
  })
}

export default createStore
