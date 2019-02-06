export default {
  SET_USER(state, user) {
    state.username = user.username
    state.token = user.token
    state.password = user.password
  },
  SET_ROLE(state, role) {
    state.role = role
  },
  SET_USERNAME(state, username) {
    state.username = username
  },
  SET_PASSWORD(state, password) {
    state.password = password
  },
  SET_INCOMES(state, incomes) {
    state.incomes = incomes
  },
  SET_EXPENSES(state, expenses) {
    state.expenses = expenses
  },
  ADD_INCOME(state, income) {
    state.incomes.push(income)
  },
  ADD_EXPENSE(state, expense) {
    state.expenses.push(expense)
  }
}
