<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <el-card class="box-card">
      <h3>{{ user.username }}</h3><br>
      <!--поля добавления расходов и доходяг-->
      <el-row>
        <el-card>
          <ul class="flex-container">
            <!--доход/расход-->
            <li>
              <p>{{ selectedState }}</p>
              <el-switch
                v-model="currentIncome.isIncome"
                style="display: block"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="Доход"
                inactive-text="Расход"/>
            </li>
            <li
              id="sum"
              class="">
              <p>Сумма</p>
              <vue-numeric
                v-validate="{ min_value:0.01, max_value:999999999999, required:true, decimal:true }"
                v-model="currentIncome.amount"
                :precision="2"
                currency="₽"
                separator="space"
                class="form-control flex-item"
                data-vv-as="сумма"
                placeholder="сумма"
                name="incomeSum"
                value=""
                decimal-separator="."/>
            </li>
            <li
              id="reason"
              class="">
              <p>Источник</p>
              <input
                v-model="currentIncome.reason"
                class="form-control flex-item"
                name="sourceIncome"
                placeholder="источник"
                type="text">
            </li>

            <li
              id="frequency"
              class="">
              <p>Количество периодов</p>
              <vue-numeric
                v-validate="{ numeric:true , max_value: 10000, min_value: 1, required:true }"
                v-model="currentIncome.frequency"
                class="form-control flex-item smalInt"
                placeholder="Количество"
                data-vv-as="количество"
                name="frequency"
                value="12"/>
            </li>
            <li
              id="period"
              class="">
              <p>Период</p>
              <select
                v-validate="{ required:true }"
                v-model="currentIncome.paymentPeriod"
                class="form-control"
                data-vv-as="период">
                <option>Единовременный</option>
                <option>День</option>
                <option>Неделя</option>
                <option>Месяц</option>
                <option>Квартал</option>
                <option>Год</option>
              </select>
            </li>
            <li
              id="date"
              class="">
              <p>Дата начала</p>
              <el-date-picker
                v-model="currentIncome.startDate"
                type="date"
                class="flex-item"/>
            </li>
            <li
              id="add"
              class="">
              <input
                class="btn btn-success flex-item"
                title="Добавить"
                value="+"
                type="submit"
                @click="addBtnClick">
            </li>
          </ul>
          <span class="">{{ errors[0] }}</span>
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
              <table class="myFavoriteTable table table-bordered">
                <thead>
                  <tr class="text-center" >
                    <th>Сумма</th>
                    <th>Источник</th>
                    <th>Периоды</th>
                    <th>Дата начала</th>
                  </tr>
                </thead>
                <tr
                  v-for="item in user.incomes"
                  :key="item.id"
                  class="form-control-static">
                  <td>
                    <vue-numeric
                      :value="item.amount"
                      :read-only="true"
                      :precision="2"
                      currency="₽"
                      separator="space"
                      decimal-separator="."/>
                  </td>
                  <td>{{ item.reason }}</td>
                  <td><label v-if="item.isRepeatable === false" >[{{ item.frequency }}]</label> {{ item.paymentPeriod }}</td>
                  <td>C {{ (new Date(item.startDate)).toLocaleDateString("ru", options) }}</td>
                  <td class="deleteRow">
                    <input
                      type="button"
                      name="deleteIncome"
                      style="margin: 0px"
                      class="btn btn-secondary btn-danger btn-sm"
                      title="Удалить"
                      value="—"
                      @click="deleteIncome(item, $event)">
                  </td>
                </tr>
              </table>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card>
              <td>
                <table class="table table-bordered">
                  <thead>
                    <tr >
                      <th>Сумма</th>
                      <th>Источник</th>
                      <th>Периоды</th>
                      <th>Дата начала</th>
                    </tr>
                  </thead>
                  <tr
                    v-for="item in user.expenses"
                    :key="item.id"
                    class="form-control-static">
                    <td>
                      <vue-numeric
                        :value="item.amount"
                        :read-only="true"
                        :precision="2"
                        currency="₽"
                        separator="space"
                        decimal-separator="."/>
                    </td>
                    <td>{{ item.reason }}</td>
                    <td><label v-if="item.isRepeatable === false" >[{{ item.frequency }}]</label> {{ item.paymentPeriod }}</td>
                    <td>C {{ (new Date(item.startDate)).toLocaleDateString("ru", options) }}</td>
                    <td class="deleteRow">
                      <input
                        type="button"
                        class="btn btn-secondary btn-sm btn-danger"
                        style="margin: 0px"
                        title="Удалить"
                        value="—"
                        name="deleteIncome"
                        @click="deleteExpense(item, $event)">
                    </td>
                  </tr>
                </table>
              </td>
            </el-card>
          </el-col>
        </el-row>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import User from '../../models/user'
// import Toggle from 'vue-libs-simple-toggle'

export default {
  name: 'UserPage',
  data() {
    return {
      user: {},
      errors: [],
      options: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      },
      username: '',
      // true = income false = expense
      currentState: true,
      currentIncome: {
        isIncome: true,
        amount: '',
        reason: '',
        paymentPeriod: '',
        frequency: '',
        startDate: new Date(Date.now()),
        isRepeatable: false
      }
    }
  },
  computed: {
    totalIncome: function() {
      if (!this.user.incomes) {
        return 0
      }
      let sum = 0
      for (let i = 0; i < this.user.incomes.length; i++) {
        sum += this.user.incomes[i].amount
      }
      return sum
    },
    totalExpense: function() {
      if (!this.user.expenses) {
        return 0
      }
      let sum = 0
      for (
        let i = 0;
        this.user !== null && i < this.user.expenses.length;
        i++
      ) {
        sum += this.user.expenses[i].amount
      }
      return sum
    },
    selectedState: function() {
      if (this.currentIncome.isIncome) return 'Доход'
      else return 'Расход'
    }
  },
  created: function() {
    let user = new User('', '', '')
    // user.username = localStorage.getItem('username')
    // user.fetch().then(() => {
    //   if (user.expenses === null) user.expenses = []
    //   if (user.incomes === null) user.incomes = []
    //   this.user = user
    // })
  },
  methods: {
    addBtnClick: function() {
      this.$validator.validateAll().then(success => {
        if (success) {
          this.currentIncome.amount = parseFloat(this.currentIncome.amount, 10)
          this.currentIncome.frequency = parseInt(
            this.currentIncome.frequency,
            10
          )
          if (this.user.incomes == null) this.user.incomes = []
          if (this.user.expenses == null) this.user.expenses = []

          this.currentIncome.isRepeatable =
            this.currentIncome.paymentPeriod === 'Единовременный'

          if (this.currentIncome.isIncome)
            this.user.incomes.push(this.currentIncome)
          else this.user.expenses.push(this.currentIncome)
          this.user.update()

          this.currentIncome = {
            isIncome: this.currentIncome.isIncome,
            amount: this.amount,
            reason: this.reason,
            paymentPeriod: this.paymentPeriod,
            frequency: this.frequency,
            startDate: new Date(Date.now()),
            isRepeatable: this.isRepeatable
          }
        }
      })
    },
    deleteIncome(incomeObj, event) {
      let index = this.user.incomes.indexOf(incomeObj)
      this.user.incomes.splice(index, 1)
      this.user.update()
    },
    deleteExpense(expenseObj, event) {
      let index = this.user.expenses.indexOf(expenseObj)
      this.user.expenses.splice(index, 1)
      this.user.update()
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.flex-item {
  margin-left: 4px;
  margin-right: 4px;
  padding-left: 8px;
  padding-right: 8px;
}

.flex-container {
  padding: 1px;
  margin: 0px;
  list-style: none;

  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;

  -webkit-flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: flex-end;
}

th {
  text-align: center;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.smalInt {
  width: auto;
  max-width: 120px;
  min-width: 40px;
}

.collumnTable {
  flex-wrap: wrap;
}

.my-table {
  width: 100%; /* Ширина всей таблицы */
}

.leftColumn {
  width: 50%; /* Ширина левой колонки */
  padding-right: 2px;
}

.rightColumn {
  width: 50%;
  padding-left: 2px;
}

.sumColumn {
  width: 20%;
}

.reasonColumn {
  justify-self: auto;
}

.deleteRow {
  width: 65px;
}

.dateColumn {
  width: 180px;
}
</style>
