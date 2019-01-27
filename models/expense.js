export default class Expense {
  id
  user
  reason
  amount
  endDate

  assignToUser(user) {
    user.expenses.push(this)
  }

  removeFromUser(user) {
    let index = user.expenses.indexOf(this)
    if (index > -1) {
      user.expenses.splice(index, 1)
    }
  }
}
