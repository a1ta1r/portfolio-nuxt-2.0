import Vuex from 'vuex'

import state from './state'
import actions from './actions'
import mutations from './mutations'

const client = () => {
  return new Vuex.Store({
    namespaced: true,
    state,
    actions,
    mutations
  })
}

export default client
