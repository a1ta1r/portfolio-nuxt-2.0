export default {
  load_advertisers({ commit }) {
    return this.$axios
      .get('partners')
      .then(result => result.data.advertisers)
      .then(advertisers => {
        commit('SET_ADVERTISERS', advertisers)
      })
  },
  load_user({ commit }, user) {
    return this.$axios.get('user', { params: user.token }).then(result => {
      commit('SET_USER', result.data.user)
      commit('SET_INCOMES', result.data.user.incomes)
      commit('SET_EXPENSES', result.data.user.expenses)
    })
  },
  sign_in({ commit }, user) {
    return this.$axios
      .post('signin', {
        data: {
          first: user.username,
          second: user.password
        }
      })
      .then(response => {
        if (response.status === 200) {
          commit('SET_USER', {
            username: user.username,
            password: user.password,
            token: 'Bearer ' + response.data.token
          })
          return response
        }
        return false
      })
      .catch(error => {
        return error.response
      })
  },

  sign_up({ commit }, user) {
    return this.$axios
      .post('signup', {
        data: user
      })
      .then(response => {
        return true
      })
      .catch(error => {
        return error.response
      })
  },

  update_user({ commit }, user) {
    return this.$axios.put('user', user)
  },

  set_username({ commit }, username) {
    commit('SET_USERNAME', username)
  },
  set_password({ commit }, password) {
    commit('SET_PASSWORD', password)
  }
}
