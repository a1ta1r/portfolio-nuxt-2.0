export default {
  load_advertisers({ commit }) {
    return this.$axios
      .get('partners')
      .then(result => result.data.advertisers)
      .then(advertisers => {
        commit('SET_ADVERTISERS', advertisers)
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
          localStorage.setItem('token', 'Bearer ' + response.data.token)
          localStorage.setItem('username', username)
          return true
        }
        return false
      })
  }
}
