export default {
  get_token({ commit, dispatch }) {
    if (process.browser) {
      let token = localStorage.getItem('authToken')
      if (token) {
        commit('SET_TOKEN', token)
        dispatch('general/set_authorized', true, { root: true })
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
  load_agenda({ commit }, range) {
    if (!range) {
      range = []
      range[0] = this.$moment()
        .subtract(5, 'y')
        .toISOString()
      range[1] = this.$moment()
        .add(5, 'y')
        .toISOString()
    }
    const token = this.state.client.token
    return this.$axios
      .get(`agenda?from=${range[0]}&to=${range[1]}`, {
        headers: {
          Authorization: token,
          'content-type': 'application/json'
        }
      })
      .then(response => {
        if (response.status === 200) {
          commit('SET_PAYMENT_PLAN', response.data)
        }
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
          if (json.role === 2 || json.role === 'Advertiser')
            this.$router.push({ name: 'advertiser' })
          else if (
            user.username === 'admin' ||
            json.role === 1 ||
            json.role === 'Admin'
          )
            this.$router.push({ name: 'secure-admin' })
          else this.$router.push({ name: 'client' })
          return response
        }
        return false
      })
      .catch(error => {
        return error.response
      })
  },

  sign_up({ commit, dispatch }, user) {
    return this.$axios
      .post('signup', {
        email: user.email,
        username: user.username,
        password: user.password
      })
      .then(response => {
        dispatch('sign_in', user)
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
    return this.$axios
      .delete(`incomes/${income.id}`, {
        headers: {
          Authorization: token
        }
      })
      .then(result => {
        if (result.status === 200) {
          commit('REMOVE_INCOME', income)
        }
      })
  },
  remove_expense({ commit }, expense) {
    const token = this.state.client.token
    return this.$axios
      .delete(`expenses/${expense.id}`, {
        headers: {
          Authorization: token
        }
      })
      .then(result => {
        if (result.status === 200) {
          commit('REMOVE_EXPENSE', expense)
        }
      })
  },

  rand_banner({ commit }) {
    return this.$axios.get('rand_banner').then(result => {
      if (result.status === 200) {
        commit('ADD_BANNER', result.data)
      }
    })
  }
}
