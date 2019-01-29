export default {
  SET_USER(state, user) {
    state.username = user.username
    state.token = user.token
    state.passive = user.password
  },
  SET_INCOMES(state, incomes) {
    state.incomes = incomes
  },
  SET_EXPENSES(state, expenses) {
    state.expenses = expenses
  }
}
