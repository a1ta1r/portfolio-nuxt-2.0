<template>
  <div>
    <el-dialog
      :visible.sync="editable"
      :before-close="handleClose"
      title="Изменения сохраняются автоматически">
      <income-expense-edit-dialog :current-income="currentEditableIncome"/>
    </el-dialog>
    <el-table
      :data="currentIncomes"
      class="myFavoriteTable table table-bordered"
    >
      <el-table-column
        :formatter="amountFormatter"
        label="Сумма"
        prop="amount"
        sortable/>
      <el-table-column
        label="Источник"
        prop="reason"
        sortable/>
      <el-table-column
        :formatter="periodFormatter"
        label="Периоды"
        prop="paymentPeriod"
        sortable/>
      <el-table-column
        :formatter="dateFormatter"
        label="Дата начала"
        prop="startDate"
        sortable/>
      <el-table-column
        label="Операции">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              size="small"
              class="el-icon-edit"
              round
              @click="editRow(scope)"/>
            <el-popover
              ref="popover"
              v-model="scope.row.show_del"
              trigger="click"
              placement="top">
              <p align="left">Удалить {{ scope.row.reason }}?</p>
              <div style="text-align: center">
                <el-button
                  size="mini"
                  type="text"
                  @click="scope.row.show_del = false">Не надо</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="removeItem(scope)">Да
                </el-button>
              </div>
            </el-popover>
            <el-button
              v-popover:popover
              size="small"
              plain
              type="danger"
              class="el-icon-delete"
              round
              @click="scope.row.show_del = true"/>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import incomeExpenseEditDialog from './incomeExpenseEditDialog'
import { mapState } from 'vuex'

export default {
  name: 'IncomeExpenseTable',
  components: { incomeExpenseEditDialog },
  props: {
    isIncome: {
      type: Boolean,
      default: false
    },
    currentIncomes: {
      type: Array,
      default: () => {
        return [
          {
            isIncome: true,
            amount: 1000,
            reason: '',
            paymentPeriod: '',
            frequency: '',
            startDate: new Date(Date.now()),
            isRepeatable: false
          }
        ]
      }
    }
  },
  data() {
    return {
      editable: false,
      currentEditableIncome: {}
    }
  },
  computed: {
    ...mapState('client', ['incomes', 'expenses'])
  },
  methods: {
    dateFormatter(cellValue) {
      let value = new Date(cellValue.startDate)
      return value.toLocaleDateString('ru')
    },
    amountFormatter(cellValue) {
      return cellValue.amount.toFixed(2)
    },
    periodFormatter(cellValue) {
      switch (cellValue.paymentPeriod) {
        case 0:
          return 'День'
        case 1:
          return 'Неделя'
        case 2:
          return 'Месяц'
        case 3:
          return 'Квартал'
        case 4:
          return 'Год'
        case 5:
          return 'Единовременный' // TODO Заменить на корректные значения
        case -1:
          return 'Бессрочный' // TODO Заменить на корректные значения
      }
    },
    handleClose(done) {
      switch (this.currentEditableIncome.paymentPeriod) {
        case 'День':
          this.currentEditableIncome.paymentPeriod = 0
          break
        case 'Неделя':
          this.currentEditableIncome.paymentPeriod = 1
          break
        case 'Месяц':
          this.currentEditableIncome.paymentPeriod = 2
          break
        case 'Квартал':
          this.currentEditableIncome.paymentPeriod = 3
          break
        case 'Год':
          this.currentEditableIncome.paymentPeriod = 4
          break
        case 'Единовременный':
          this.currentEditableIncome.paymentPeriod = 5
          break // TODO Заменить на корректные значения
        case 'Бессрочный':
          this.currentEditableIncome.paymentPeriod = -1
          break // TODO Заменить на корректные значения
      }
      this.$store.dispatch('client/update_user', {
        expenses: this.expenses,
        incomes: this.incomes
      })
      done()
    },
    removeItem(item) {
      // TODO mutations and actions
      let index = this.currentIncomes.indexOf(item.row)
      this.currentIncomes.splice(index, 1)
      if (this.isIncome) {
        this.$store.dispatch('client/remove_income', item.row.id)
      } else this.$store.dispatch('client/remove_expense', item.row.id)
    },
    editRow(scope) {
      this.currentEditableIncome = scope.row
      switch (this.currentEditableIncome.paymentPeriod) {
        case 0:
          this.currentEditableIncome.paymentPeriod = 'День'
          break
        case 1:
          this.currentEditableIncome.paymentPeriod = 'Неделя'
          break
        case 2:
          this.currentEditableIncome.paymentPeriod = 'Месяц'
          break
        case 3:
          this.currentEditableIncome.paymentPeriod = 'Квартал'
          break
        case 4:
          this.currentEditableIncome.paymentPeriod = 'Год'
          break
        case 5: // TODO Заменить на корректные значения
          this.currentEditableIncome.paymentPeriod = 'Единовременный'
          break
        case -1: // TODO Заменить на корректные значения
          this.currentEditableIncome.paymentPeriod = 'Бессрочный'
          break
      }
      this.editable = true
    }
  }
}
</script>

<style scoped>
</style>
