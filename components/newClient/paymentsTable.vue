<template>
  <div
    id="payemnts-table"
    class="form-group">
    <el-table
      :data="payments"
      style="width: 100%">
      <el-table-column
        :formatter="dateFormatter"
        prop="paymentDate"
        label="Дата платежа"
        width="180"/>
      <el-table-column
        :formatter="amountFormatter"
        prop="paymentAmount"
        label="Сумма платежа"
        width="180"/>
      <el-table-column
        :formatter="amountFormatter"
        prop="address"
        label="Остаток задолженности"/>
    </el-table>
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
    dateFormatter(cellValue) {
      return cellValue.paymentDate.toLocaleDateString('ru')
    },
    amountFormatter(cellValue) {
      return cellValue.paymentAmount.toFixed(2)
    },
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
