export class Payment {
  paymentDate
  paymentAmount
  remainingAmount

  constructor(month, sum, remAmount) {
    this.paymentDate = month
    this.paymentAmount = sum
    this.remainingAmount = remAmount
  }
}
