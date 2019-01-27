export default class PaymentPlan {
  static LoanTypes = {
    Even: 'Аннуитетный',
    Differentiated: 'Дифференцированный'
  }

  id
  title
  paymentType
  paymentAmount
  interestRate
  currency
  numberOfMonths
  paymentList
  startDate
  totalPaymentAmount

  constructor() {
    this.title = 'Новый кредит'
    this.paymentType = PaymentPlan.LoanTypes.Even
    this.numberOfMonths = 0
    this.interestRate = 0
    this.totalPaymentAmount = 0
    this.paymentAmount = 0
    this.paymentList = []
    this.startDate = new Date(Date.now())
  }
}
