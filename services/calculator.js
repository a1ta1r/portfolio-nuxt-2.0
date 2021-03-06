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
    date.setMonth(paymentPlan.startDate.getMonth() - 1) // костыль чтобы в цыкле первая дата прибавилась нормально

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
      let remAmount = paymentPlan.totalPaymentAmount - sum * (i + 1)
      paymentPlan.paymentList[i] = new Payment(
        new Date(currentMonth),
        sum,
        remAmount
      )
    }

    return paymentPlan
  }

  static calculateDifferentiated(paymentPlan) {
    let date = paymentPlan.startDate
    date.setMonth(paymentPlan.startDate.getMonth() - 1) // костыль чтобы в цыкле первая дата прибавилась нормально

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

    let tempTotalPaymentAmount = paymentPlan.totalPaymentAmount
    for (let i = 0; i < paymentPlan.numberOfMonths; i++) {
      paymentPlan.paymentList[i].remainingAmount =
        tempTotalPaymentAmount - paymentPlan.paymentList[i].paymentAmount
      tempTotalPaymentAmount =
        tempTotalPaymentAmount - paymentPlan.paymentList[i].paymentAmount
    }

    return paymentPlan
  }
}
