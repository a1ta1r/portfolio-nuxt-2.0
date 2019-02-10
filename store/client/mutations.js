export default {
  SET_USER(state, user) {
    state.username = user.username
    state.id = user.id
    state.email = user.email
    state.role = user.role
    if (user.token != null) state.token = user.token
    if (user.password != null) state.password = user.password
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
    if (incomes == null) incomes = []
    state.incomes = incomes
  },
  SET_EXPENSES(state, expenses) {
    if (expenses == null) expenses = []
    state.expenses = expenses
  },
  ADD_INCOME(state, income) {
    state.incomes.push(income)
  },
  ADD_EXPENSE(state, expense) {
    state.expenses.push(expense)
  }
}
