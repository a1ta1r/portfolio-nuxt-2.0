export default {
  load_user({ commit }) {
    const token = this.state.client.token
    return this.$axios
      .get('user', { headers: { Authorization: token } })
      .then(result => {
        console.log(result)
        // commit('SET_USER', result.data.user)
        // commit('SET_INCOMES', result.data.user.incomes)
        // commit('SET_EXPENSES', result.data.user.expenses)
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
  },

  add_income({ commit }, income) {
    commit('ADD_INCOME', income)
  },
  add_expense({ commit }, expense) {
    commit('ADD_EXPENSE', expense)
  }
}
