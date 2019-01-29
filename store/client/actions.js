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
  sign_in({ commit }, username, password) {
    return this.$axios
      .post('signin', {
        username: username,
        password: password
      })
      .then(response => {
        if (response.status === 200) {
          commit('SET_USER', {
            username: username,
            password: password,
            token: 'Bearer ' + response.data.token
          })
          return true
        }
        return false
      })
  },

  update_user({ commit }, user) {
    return this.$axios.put('user', user)
  }
}
