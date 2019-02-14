export default {
  get_token({ commit, dispatch }) {
    if (process.browser) {
      let token = localStorage.getItem('authToken')
      if (token) {
        commit('SET_TOKEN', token)
        dispatch('general/set_authorized', true)
      }
    }
  },
  log_out({ commit }) {
    if (process.browser) {
      localStorage.removeItem('authToken')
      commit('REMOVE_TOKEN')
    }
  },
  load_user({ commit }) {
    const token = this.state.client.token
    return this.$axios
      .get('user', {
        headers: {
          Authorization: token,
          'content-type': 'application/json'
        }
      })
      .then(result => {
        commit('SET_USER', result.data)
        commit('SET_INCOMES', result.data.incomes)
        commit('SET_EXPENSES', result.data.expenses)
      })
      .catch(error => {
        // this.$router.push({ name: 'signIn' }) // TODO: Может можно сделать, чтоб не успевало отобразить страницу
      })
  },
  load_incomes({ commit }) {
    const token = this.state.client.token
    return this.$axios
      .get('incomes', {
        headers: {
          Authorization: token,
          'content-type': 'application/json'
        }
      })
      .then(result => {
        commit('SET_INCOMES', result.data.incomes)
      })
  },
  load_expenses({ commit }) {
    const token = this.state.client.token
    return this.$axios
      .get('expenses', {
        headers: {
          Authorization: token,
          'content-type': 'application/json'
        }
      })
      .then(result => {
        commit('SET_EXPENSES', result.data.expenses)
      })
  },
  sign_in({ commit }, user) {
    return this.$axios
      .post('signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.status === 200) {
          commit('SET_USER', {
            username: user.username,
            password: user.password,
            token: 'Bearer ' + response.data.token
          })
          let json = JSON.parse(atob(response.data.token.split('.')[1]))
          commit('SET_ROLE', json.role)
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
        email: user.email,
        username: user.username,
        password: user.password
      })
      .then(response => {
        return true
      })
      .catch(error => {
        return error.response
      })
  },

  update_user({ commit }, user) {
    return this.$axios
      .put('user', user, {
        headers: {
          Authorization: this.state.client.token,
          'content-type': 'application/json'
        }
      })
      .then(result => {
        commit('SET_USER', result.data.user)
        commit('SET_INCOMES', result.data.user.incomes)
        commit('SET_EXPENSES', result.data.user.expenses)
      })
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
  },
  remove_income({ commit }, income) {
    const token = this.state.client.token
    this.$axios.delete(`incomes/${income}`, {
      headers: {
        Authorization: token
      }
    })
    // commit('REMOVE_INCOME', income)
  },
  remove_expense({ commit }, expense) {
    const token = this.state.client.token
    this.$axios.delete(`expenses/${expense}`, {
      headers: {
        Authorization: token
      }
    })
    // commit('REMOVE_EXPENSE', expense)
  }
}
