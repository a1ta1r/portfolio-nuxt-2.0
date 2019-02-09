<template>
  <el-table
    :data="payments"
    style="width: 100%">
    <el-table-column
      :formatter="dateFormatter"
      prop="paymentDate"
      label="Дата платежа"/>
    <el-table-column
      :formatter="amountFormatter"
      prop="paymentAmount"
      label="Сумма платежа"/>
    <el-table-column
      :formatter="remainingFormatter"
      prop="remainingAmount"
      label="Остаток задолженности"/>
  </el-table>
</template>

<script>
export default {
  name: 'PaymentsTable',
  props: {
    payments: {
      type: Array,
      default: () => {
        return [
          {
            paymentDate: new Date(Date.now()),
            paymentAmount: 0,
            remainingAmount: 0
          }
        ]
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
  methods: {
    dateFormatter(cellValue) {
      return cellValue.paymentDate.toLocaleDateString('ru')
    },
    amountFormatter(cellValue) {
      return cellValue.paymentAmount.toFixed(2)
    },
    remainingFormatter(cellValue) {
      return cellValue.remainingAmount.toFixed(2)
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
