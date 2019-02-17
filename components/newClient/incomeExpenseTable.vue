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
        label="Дата"
        prop="startDate"
        sortable>
        <template slot-scope="scope">
          <span v-popover:dates_popover >
            {{ dateFormatter(scope.row) }}
            <el-badge
              slot="reference"
              :value="dates_filter(scope.row.dates).length"
              class="mark"/></span>
          <el-popover
            ref="dates_popover"
            placement="right"
            width="280"
            trigger="click">
            <little-dates-table
              :grid-data="dates_filter(scope.row.dates)"/>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="Операции">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              :round="roundBtn"
              size="small"
              class="el-icon-edit"
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
              :round="roundBtn"
              size="small"
              plain
              type="danger"
              class="el-icon-delete"
              @click="scope.row.show_del = true"/>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import incomeExpenseEditDialog from './incomeExpenseEditDialog'
import littleDatesTable from './littleDatesTable'
import { mapState } from 'vuex'

export default {
  name: 'IncomeExpenseTable',
  components: { incomeExpenseEditDialog, littleDatesTable },
  props: {
    currentMonth: {
      type: Number,
      default: new Date().getMonth()
    },
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
            isRepeatable: false,
            isForever: false
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
    ...mapState('client', ['incomes', 'expenses']),
    roundBtn: function() {
      return this.$mq !== 'md' && this.$mq !== 'sm'
    }
  },
  methods: {
    multiple_dates(cellValue) {},
    dates_filter(value) {
      return value.filter(value => value.month() === this.currentMonth)
    },
    dateFormatter(cellValue) {
      let value = this.$moment(cellValue.startDate)
      for (let i = 0; i < cellValue.dates.length; i++) {
        if (cellValue.dates[i].month() === this.currentMonth) {
          value = cellValue.dates[i]
          break
        }
      }
      return value.toDate().toLocaleDateString('ru')
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
          return 'Единовременный'
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
          break
      }
      if (this.currentEditableIncome.isForever) {
        this.currentEditableIncome.frequency = -1
      }
      this.$store.dispatch('client/update_user', {
        expenses: this.expenses,
        incomes: this.incomes
      })

      // TODO Сейчас тут не узнать, доход или расход изменён
      this.$notify.success({
        title: 'Данные изменены',
        message: 'Вы изменили данные'
      })

      done()
    },
    removeItem(item) {
      // TODO mutations and actions
      let index = this.currentIncomes.indexOf(item.row)
      this.currentIncomes.splice(index, 1)
      if (this.isIncome) {
        this.$store.dispatch('client/remove_income', item.row).then(
          this.$notify.success({
            title: 'Доход удалён',
            message: 'Вы удалили доход'
          })
        )
      } else {
        this.$store.dispatch('client/remove_expense', item.row).then(
          this.$notify.success({
            title: 'Расход удалён',
            message: 'Вы удалили расход'
          })
        )
      }
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
        case 5:
          this.currentEditableIncome.paymentPeriod = 'Единовременный'
          break
      }
      this.editable = true
    }
  }
}
</script>

<style scoped>
</style>
