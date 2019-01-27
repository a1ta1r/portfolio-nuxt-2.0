export default class Income {
  id
  user
  reason
  amount

  assignToUser(user) {
    user.incomes.push(this)
  }

  removeFromUser(user) {
    let index = user.expenses.indexOf(this)
    if (index > -1) {
      user.expenses.splice(index, 1)
    }
  }
}
