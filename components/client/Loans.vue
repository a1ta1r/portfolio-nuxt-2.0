<template>
  <div>
    <h3>{{ user.username }}</h3><br>
    <div>
      <table class="table table-bordered">
        <thead>
          <tr class="text-center">
            <th>Название</th>
            <th>Дата начала</th>
            <th>Сумма</th>
          </tr>
        </thead>
        <tr 
          v-for="item in user.paymentPlans" 
          :key="item" 
          class="form-control-static">
          <td>{{ item.title }}</td>
          <td>C {{ (new Date(item.startDate)).toLocaleDateString("ru", options) }}</td>
          <td>{{ item.paymentAmount }}</td>
          <td class="deleteRow">
            <input 
              type="button" 
              name="deleteCredit" 
              class="btn btn-secondary btn-danger btn-sm" 
              title="Удалить"
              value="—"
              @click="deleteCredit(item, $event)">
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import User from '../models/user'

export default {
  name: 'Loans',
  components: {},
  data() {
    return {
      user: {},
      options: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      },
      username: localStorage.getItem('username')
    }
  },
  created: function() {
    let user = new User('', '', '')
    user.username = localStorage.getItem('username')
    user.fetch().then(() => {
      this.user = user
      console.log(user)
    })
  },
  methods: {
    deleteCredit(creditObj, event) {
      let index = this.user.incomes.indexOf(creditObj)
      this.user.paymentPlans.splice(index, 1)
      this.user.update()
    }
  }
}
</script>

<style>
th {
  text-align: center;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
