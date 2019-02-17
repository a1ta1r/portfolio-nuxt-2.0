export default {
  SET_USER(state, user) {
    state.username = user.username
    state.id = user.id
    state.email = user.email
    state.role = user.role
    if (user.token != null) {
      state.token = user.token
      if (process.browser) {
        localStorage.setItem('authToken', user.token)
      }
    }
    if (user.password != null) state.password = user.password
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
  REMOVE_TOKEN(state) {
    state.token = ''
    state.incomes = []
    state.expenses = []
    state.username = ''
    state.id = ''
    state.email = ''
    state.role = ''
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
  },
  REMOVE_INCOME(state, income) {
    state.incomes.splice(state.incomes.indexOf(income), 1)
  },
  REMOVE_EXPENSE(state, expense) {
    state.expenses.splice(state.expenses.indexOf(expense), 1)
  },
  SET_PAYMENT_PLAN(state, plan) {
    state.paymentPlan = plan
  }
}
