<template>
  <div
    id="payemnts-table"
    class="form-group">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th
            v-for="item in columnHeads"
            :key="item">
            {{ item }}
          </th>
        </tr>
      </thead>
      <tr
        v-for="(item, index) in payments"
        :key="item.paymentDate"
        class="form-control-static">
        <td>{{ (new Date(item.paymentDate)).toLocaleDateString("ru", options) }}</td>
        <td>
          <vue-numeric
            :value="item.paymentAmount"
            :read-only="true"
            :precision="2"
            currency="₽"
            separator="space"
            decimal-separator="."/>
        </td>
        <td v-if="myPaymentPlan">
          <vue-numeric
            :value="total - countRest(index, page)"
            :read-only="true"
            :precision="2"
            currency="₽"
            separator="space"
            decimal-separator="."/>
        </td>
        <td v-if="!myPaymentPlan">
          <vue-numeric
            :value="total - item.paymentAmount * (index + 1 + ((page - 1) * 12))"
            :read-only="true"
            :precision="2"
            currency="₽"
            separator="space"
            decimal-separator="."/>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'PaymentsTable',
  props: {
    payments: {
      type: Array,
      default: function() {
        return []
      }
    },
    page: {
      type: Number,
      default: 1
    },
    myPaymentPlan: {
      type: Array,
      default: function() {
        return []
      }
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      options: {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      },
      columnHeads: ['Дата платежа', 'Сумма платежа', 'Остаток задолженности']
    }
  },
  methods: {
    countRest: function(currNumb, currPage) {
      let result = 0
      let index = (currPage - 1) * 12 + currNumb + 1
      for (let i = 0; i < index; i++) {
        result = result + this.myPaymentPlan[i]
      }
      return result
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
</style>
