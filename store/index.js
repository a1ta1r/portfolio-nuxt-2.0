import Vuex from 'vuex'
import admin from 'admin/admin'
import client from 'client/client'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      admin,
      client
    }
  })
}

export default createStore
