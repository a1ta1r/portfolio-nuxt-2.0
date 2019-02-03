<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <el-card class="box-card">
      <h3>{{ username }}</h3><br>
      <!--поля добавления расходов и доходяг-->
      <el-row>
        <el-card>
          <el-collapse >
            <el-collapse-item>
              <template slot="title">
                <h2>Добавить</h2>
              </template>
              <income-expense-form-add :current-income="currentIncome" />
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-row>
      <!--сумма доходов и расходов-->
      <el-row :gutter="8">
        <el-col :span="12">
          <el-card class="">
            <label class="form-control form-control-success">
              Доходы:
              <vue-numeric
                :value="totalIncome"
                :read-only="true"
                :precision="2"
                currency="₽"
                separator="space"
                decimal-separator="."/>
            </label>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="">
            <label class="form-control form-control-success">
              Расходы:
              <vue-numeric
                :value="totalExpense"
                :read-only="true"
                :precision="2"
                currency="₽"
                separator="space"
                decimal-separator="."/>
            </label>

          </el-card>
        </el-col>
      </el-row>
      <!--таблички с доходами и расходами на твое содержание-->
      <el-row>
        <el-row :gutter="8">
          <el-col :span="12">
            <el-card>
              <income-expense-table :current-incomes="incomes"/>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card>
              <income-expense-table :current-incomes="expenses"/>
            </el-card>
          </el-col>
        </el-row>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VueNumeric from 'vue-numeric'
import ElCollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import incomeExpenseFormAdd from './incomeExpenseAddForm'
import incomeExpenseTable from './incomeExpenseTable'
// import Toggle from 'vue-libs-simple-toggle'

export default {
  name: 'UserPage',
  components: {
    ElCollapseTransition,
    incomeExpenseTable,
    incomeExpenseFormAdd,
    VueNumeric
  },
  data() {
    return {
      user: {},
      errors: [],
      username: '',
      // true = income false = expense
      currentState: true,
      currentIncome: {
        isIncome: true,
        amount: '1000',
        reason: '',
        paymentPeriod: 'Месяц',
        frequency: '12',
        startDate: new Date(Date.now()),
        isRepeatable: false
      }
    }
  },
  computed: {
    ...mapState('client', ['incomes', 'expenses', 'username']),
    totalIncome: function() {
      if (!this.incomes) {
        return 0
      }
      let sum = 0
      for (let i = 0; i < this.incomes.length; i++) {
        sum += this.incomes[i].amount
      }
      return sum
    },
    totalExpense: function() {
      if (!this.expenses) {
        return 0
      }
      let sum = 0
      for (let i = 0; i < this.expenses.length; i++) {
        sum += this.expenses[i].amount
      }
      return sum
    },
    selectedState: function() {
      if (this.currentIncome.isIncome) return 'Доход'
      else return 'Расход'
    }
  },
  mounted() {
    // this.$store.dispatch('client/load_user')
  },
  methods: {
    deleteIncome(incomeObj) {
      let index = this.user.incomes.indexOf(incomeObj)
      this.user.incomes.splice(index, 1)
      this.user.update()
    },
    deleteExpense(expenseObj) {
      let index = this.user.expenses.indexOf(expenseObj)
      this.user.expenses.splice(index, 1)
      this.user.update()
    }
  }
}
</script>

<style scoped>
/*он используется на самом деле*/
.el-row {
  margin-bottom: 12px;
}
</style>
