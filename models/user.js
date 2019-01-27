export default class User {
  id
  email
  username
  password
  role
  incomes
  expenses
  paymentPlans

  constructor(username, password, email) {
    this.username = username
    this.password = password
    this.email = email
    this.incomes = []
    this.expenses = []
    this.paymentPlans = []
  }
}
//   fetch() {
//     return HTTP.get('/user/name/' + this.username, {
//       headers: {
//         Authorization: localStorage.getItem('token')
//       }
//     })
//       .then(response => {
//         this.email = response.data.email
//         this.id = response.data.id
//         this.role = response.data.role
//         this.incomes = response.data.incomes
//         this.expenses = response.data.expenses
//         this.paymentPlans = response.data.paymentPlans
//       })
//       .catch(error => {
//         console.log(error)
//       })
//   }
//
//   save() {
//     return HTTP.post('/signup', this, {
//       headers: {
//         Authorization: localStorage.getItem('token')
//       }
//     })
//       .then(response => {
//         return response.status
//       })
//       .catch(error => {
//         console.log(error)
//       })
//   }
//
//   update() {
//     return HTTP.post('/user/update', this, {
//       headers: {
//         Authorization: localStorage.getItem('token')
//       }
//     }).then(() => {})
//   }
// }
