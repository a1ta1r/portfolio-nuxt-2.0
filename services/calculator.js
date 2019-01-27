import PaymentPlan from '../models/paymentPlan'
import { Payment } from '../models/payment'

export default class Calculator {
  static calculate(plan) {
    if (plan.paymentType === PaymentPlan.LoanTypes.Even) {
      return this.calculateEqual(plan)
    } else {
      return this.calculateDifferentiated(plan)
    }
  }

  static calculateEqual(paymentPlan) {
    let date = paymentPlan.startDate

    let month = paymentPlan.numberOfMonths
    let percent = paymentPlan.interestRate / 12 / 100

    let koef =
      (percent * Math.pow(1 + percent, month)) /
      (Math.pow(1 + percent, month) - 1)

    let sum = paymentPlan.paymentAmount * koef

    paymentPlan.totalPaymentAmount = sum * paymentPlan.numberOfMonths
    paymentPlan.paymentList = []

    for (let i = 0; i < paymentPlan.numberOfMonths; i++) {
      let currentMonth = date.setMonth(date.getMonth() + 1)
      paymentPlan.paymentList[i] = new Payment(new Date(currentMonth), sum)
    }

    return paymentPlan
  }

  static calculateDifferentiated(paymentPlan) {
    let date = paymentPlan.startDate

    let baseFee = paymentPlan.paymentAmount / paymentPlan.numberOfMonths

    paymentPlan.totalPaymentAmount = 0
    paymentPlan.paymentList = []

    for (let i = 0; i < paymentPlan.numberOfMonths; i++) {
      let currentMonth = date.setMonth(date.getMonth() + 1)
      let sum =
        baseFee +
        ((paymentPlan.paymentAmount - baseFee * i) * paymentPlan.interestRate) /
          100 /
          12
      paymentPlan.paymentList[i] = new Payment(new Date(currentMonth), sum)
      paymentPlan.totalPaymentAmount += sum
    }

    return paymentPlan
  }
}
