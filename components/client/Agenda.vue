<template>
  <div class="flex-container">
    <h1 class="form-control-static">Лента событий</h1>
    <h3>Баланс с {{ new Date(startDate).toLocaleDateString('ru', options) }} по {{ new Date(endDate).toLocaleDateString('ru', options) }}: <vue-numeric 
      :minus="true" 
      :value="sum" 
      :read-only="true" 
      :precision="2"
      class="form-control-static" 
      decimal-separator="." 
      separator="space" 
      currency="₽"/></h3>
    <table class="table table-bordered">
      <tr 
        v-for="event in events" 
        :key="event">
        <td>{{ new Date(event.date).toLocaleDateString('ru', options) }}</td>
        <td>{{ event.reason }}</td>
        <td><vue-numeric 
          :minus="true" 
          :value="event.amount" 
          :read-only="true" 
          :precision="2"
          class="form-control-static" 
          decimal-separator="." 
          separator="space" 
          currency="₽"/></td>
      </tr>
    </table>
  </div>
</template>

<script>
import User from '../models/user'

export default {
  name: 'Agenda',
  data() {
    return {
      options: {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      },
      startDate: new Date(Date.now()),
      dates: [],
      events: [],
      combined: this.combinedEvents,
      sum: 0,
      user: User
    }
  },
  computed: {
    endDate: function() {
      return new Date(this.startDate.setMonth(this.startDate.getMonth() + 1))
    }
  },
  created: function() {
    let user = new User('', '', '')
    user.username = localStorage.getItem('username')
    user.fetch().then(() => {
      this.user = user
      this.incomes()
      this.expenses()
      this.payments()
    })
  },
  mounted: function() {
    this.combined = this.combinedEvents()
  },
  methods: {
    combinedEvents: function() {
      let combined = []
      this.events.forEach(function(event) {
        let date = new Date(event.date).toDateString()
        if (!(date in combined)) {
          combined[date] = []
        }
        combined[date].push(event)
      })
      console.log(combined)
      return combined
    },
    incomes: function() {
      let end = this.endDate
      let ctx = this
      this.user.incomes.forEach(function(income) {
        let paymentDate = income.startDate
        while (new Date(end) >= new Date(paymentDate)) {
          ctx.events.push({
            date: paymentDate,
            amount: income.amount,
            reason: income.reason
          })
          ctx.sum += income.amount
          paymentDate = ctx.nextPeriod(income, paymentDate)
        }
      })
    },
    expenses: function() {
      let end = this.endDate
      let ctx = this
      this.user.expenses.forEach(function(expense) {
        let paymentDate = expense.startDate
        while (new Date(end) > new Date(paymentDate)) {
          ctx.events.push({
            date: paymentDate,
            amount: expense.amount * -1,
            reason: expense.reason
          })
          ctx.sum -= expense.amount
          paymentDate = ctx.nextPeriod(expense, paymentDate)
        }
      })
    },
    payments: function() {
      let end = this.endDate
      let ctx = this

      this.user.paymentPlans.forEach(function(plan) {
        plan.paymentList.forEach(function(payment) {
          if (new Date(end) >= new Date(payment.paymentDate)) {
            let d = new Date(payment.paymentDate).toLocaleDateString(
              'ru',
              ctx.options
            )
            ctx.dates.push(d)
            ctx.events.push({
              date: payment.paymentDate,
              amount: payment.paymentAmount * -1,
              reason: plan.title
            })
            ctx.sum -= payment.paymentAmount
          }
        })
      })
    },
    nextPeriod: function(incExp, date) {
      date = new Date(date)
      if (incExp.isRepeatable) {
        return date
      }
      switch (incExp.paymentPeriod) {
        case 'День':
          return date.setDate(date.getDate() + incExp.frequency)
        case 'Неделя':
          return date.setDate(date.getDate() + incExp.frequency * 7)
        case 'Месяц':
          return date.setMonth(date.getMonth() + incExp.frequency)
        case 'Квартал':
          return date.setMonth(date.getMonth() + incExp.frequency * 3)
        case 'Год':
          return date.setFullYear(date.getFullYear() + incExp.frequency)
      }
    }
  }
}
</script>

<style scoped>
th {
  text-align: center;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.flex-container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
</style>
