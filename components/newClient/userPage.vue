<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <el-card class="box-card">
      <!--поля добавления расходов и доходяг-->
      <el-row :gutter="8">
        <el-col
          :xs="0"
          :sm="2"
          :md="3"
          :lg="5"
          :xl="8">
          <el-card
            :body-style="{ padding: '5px' }">
            <el-carousel
              :class="{ bigAdvert: moreAdvertisement }"
              :interval="7000"
              indicator-position="none"
              arrow="never"
              height="80px">
              <el-carousel-item
                v-for="item in 4"
                :class="{ bigAdvert: moreAdvertisement }"
                :key="item"/>
            </el-carousel>
          </el-card>
        </el-col>
        <el-col
          :xs="24"
          :sm="20"
          :md="18"
          :lg="14"
          :xl="8">
          <el-card>
            <el-collapse @change="moreAdvertisement = !moreAdvertisement">
              <el-collapse-item>
                <template slot="title">
                  <h2>Добавить</h2>
                </template>
                <income-expense-form-add :current-income="currentIncome" />
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-col>
        <el-col
          :xs="0"
          :sm="2"
          :md="3"
          :lg="5"
          :xl="8">
          <el-card
            :body-style="{ padding: '5px' }">
            <el-carousel
              :class="{ bigAdvert: moreAdvertisement }"
              :interval="7000"
              :initial-index = "2"
              indicator-position="none"
              arrow="never"
              height="80px">
              <el-carousel-item
                v-for="item in 4"
                :class="{ bigAdvert: moreAdvertisement }"
                :key="item"/>
            </el-carousel>
          </el-card>
        </el-col>
      </el-row>
      <!--таблички с доходами и расходами на твое содержание-->
      <el-row>
        <el-row>
          <el-card :body-style="{ textAlign: 'center' }">
            <label class="form-control form-control-success">
              Баланс:
              <vue-numeric
                :value="usersBalanse"
                :read-only="true"
                :precision="2"
                currency="₽"
                separator="space"
                decimal-separator="."/>
            </label>
          </el-card>
        </el-row>
        <el-row :gutter="8">
          <el-col
            :xs="24"
            :sm="24"
            :md="12"
            :lg="12"
            :xl="12">
            <el-row>
              <el-card :body-style="{ textAlign: 'center' }">
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
            </el-row>
            <el-row>
              <el-card>
                <income-expense-table
                  :current-incomes="incomes"
                  :is-income="true"/>
              </el-card>
            </el-row>
          </el-col>
          <el-col
            :xs="24"
            :sm="24"
            :md="12"
            :lg="12"
            :xl="12">
            <el-row>
              <el-card :body-style="{ textAlign: 'center' }">
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
            </el-row>
            <el-row>
              <el-card>
                <income-expense-table
                  :current-incomes="expenses"
                  :is-income="false"/>
              </el-card>
            </el-row>
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
      },
      moreAdvertisement: false
    }
  },
  computed: {
    ...mapState('client', ['incomes', 'expenses', 'username', 'currentPage']),
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
    usersBalanse: function() {
      return this.totalIncome - this.totalExpense
    },
    selectedState: function() {
      if (this.currentIncome.isIncome) return 'Доход'
      else return 'Расход'
    }
  },
  beforeCreate() {
    this.$store.dispatch('client/load_user')
    // this.$store.dispatch('client/load_incomes')
    // this.$store.dispatch('client/load_expenses')
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

.bigAdvert {
  height: 520px;
}

.el-carousel__item:nth-child(1) {
  background-image: url(http://www.brd24.com/up/iblock/129/12956f0c2220c2a090d038422f43c966.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 3px;
}
.el-carousel__item:nth-child(2) {
  background-image: url(http://secondstreet.ru/uploads/images/00/50/88/2012/12/11/43c003.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 3px;
}
.el-carousel__item:nth-child(3) {
  background-image: url(http://riffberg.com.ua/files/uploads/Myagkiy-kojaniy-portfel-koricneviy-bel.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 3px;
}
.el-carousel__item:nth-child(4) {
  background-image: url(https://st2.depositphotos.com/7375876/12353/i/950/depositphotos_123538046-stock-photo-leather-briefcase-in-his-hand.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 3px;
}
</style>
