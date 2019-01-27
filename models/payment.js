export class Payment {
  paymentDate
  paymentAmount

  constructor(month, sum) {
    this.paymentDate = month
    this.paymentAmount = sum
  }
}
