import Vuex from 'vuex'
import admin from './admin/admin'
import client from './client/client'
import general from './general/general'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      admin,
      client,
      general
    }
  })
}

export default createStore
