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
          :xl="7">
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
          :xl="10">
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
          :xl="7">
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
            <el-row>
              <el-col
                :xs="24"
                :sm="8"
                :md="6"
                :lg="7"
                :xl="6">
                <el-row>
                  <el-button
                    type="success"
                    icon="el-icon-time"
                    round
                    @click="resetTime">
                    {{ (currentMonth === new Date().getMonth()? 'Сейчас ' : 'Вернуть ') + (months[new Date().getMonth()].toLowerCase()) }}
                  </el-button>
                </el-row>
              </el-col>
              <el-col
                :xs="24"
                :sm="16"
                :md="11"
                :lg="10"
                :xl="12">
                <el-row>
                  <el-button-group>
                    <el-button
                      icon="el-icon-d-arrow-left"
                      round
                      @click="changeMonth(false)">
                      {{ monthBefore }}</el-button>
                    <el-button
                      icon="el-icon-tickets"
                      round>
                      {{ showMonth }}
                    </el-button>
                    <el-button
                      round
                      @click="changeMonth(true)">{{ monthAfter }}
                      <i class="el-icon-d-arrow el-icon-d-arrow-right"/>
                    </el-button>
                  </el-button-group>
                </el-row>
              </el-col>
              <el-col
                :xs="24"
                :sm="24"
                :md="7"
                :lg="7"
                :xl="6">
                <el-popover
                  ref="popover"
                  :content="balanceMessage"
                  placement="top-start"
                  trigger="hover"/>
                <el-button
                  v-popover:popover
                  :type="balanceType"
                  round>
                  {{ 'Баланс на ' + (months[currentMonth].toLowerCase()) }}
                  <vue-numeric
                    :value="usersBalance"
                    :read-only="true"
                    :precision="2"
                    currency="₽"
                    separator="space"
                    decimal-separator="."/>
                </el-button>
              </el-col>
            </el-row>
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
                  :current-month="currentMonth"
                  :current-year="currentYear"
                  :current-incomes="financeByMonth(true)"
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
                  :current-month="currentMonth"
                  :current-incomes="financeByMonth(false)"
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
      // true = income false = expense
      currentState: true,
      currentIncome: {
        isIncome: true,
        amount: '1000',
        reason: '',
        paymentPeriod: 'Месяц',
        recurrentCount: 12,
        frequency: 1,
        startDate: new Date(Date.now()),
        isRepeatable: false,
        isForever: false
      },
      moreAdvertisement: false,
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      months: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
      ],
      periods: ['day', 'week', 'month', 'quarter', 'year']
    }
  },
  computed: {
    ...mapState('client', ['incomes', 'expenses', 'username', 'paymentPlan']),
    totalIncome: function() {
      let incomes = this.financeByMonth(true)
      if (!incomes) {
        return 0
      }
      let sum = 0
      for (let i = 0; i < incomes.length; i++) {
        if (incomes[i].dates.length > 0)
          sum +=
            incomes[i].amount *
            incomes[i].dates.filter(
              value =>
                value.month() === this.currentMonth &&
                value.year() === this.currentYear
            ).length
        else sum += incomes[i].amount
      }
      return sum
    },
    totalExpense: function() {
      let expenses = this.financeByMonth(false)
      if (!expenses) {
        return 0
      }
      let sum = 0
      for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].dates.length > 0)
          sum +=
            expenses[i].amount *
            expenses[i].dates.filter(
              value =>
                value.month() === this.currentMonth &&
                value.year() === this.currentYear
            ).length
        else sum += expenses[i].amount
      }
      return sum
    },
    usersBalance: function() {
      return this.totalIncome - this.totalExpense
    },
    selectedState: function() {
      if (this.currentIncome.isIncome) return 'Доход'
      else return 'Расход'
    },
    showMonth: function() {
      return this.months[this.currentMonth] + ' ' + this.currentYear
    },
    monthBefore: function() {
      if (this.currentMonth === 0)
        return this.months[11] + ' ' + (this.currentYear - 1).toString()
      return this.months[this.currentMonth - 1]
    },
    monthAfter: function() {
      if (this.currentMonth === 11)
        return this.months[0] + ' ' + (this.currentYear + 1).toString()
      return this.months[this.currentMonth + 1]
    },
    balanceType: function() {
      if (this.usersBalance > 0) {
        return 'success'
      }
      if ((this.totalIncome / this.totalExpense) * 100 < 50) {
        return 'danger'
      }
      if (this.usersBalance < 0) {
        return 'warning'
      }
      return 'info'
    },
    balanceMessage: function() {
      if (this.usersBalance > 0) {
        return 'С этим можно жить'
      }
      if ((this.totalIncome / this.totalExpense) * 100 < 50) {
        return 'Ваших расходов в 2 раза больше чем доходов'
      }
      if (this.usersBalance < 0) {
        return 'Вы тратите больше чем зарабатываете'
      }
      return 'Идеальный баланс доходов и расходов'
    }
  },
  mounted() {
    this.$store.dispatch('general/set_route', 'client')
    this.$store.dispatch('client/load_user').then(() => {
      if (this.username) {
        this.$store.dispatch('client/load_agenda', false)
        this.$store.dispatch('general/set_authorized', true)
      }
    })
  },
  methods: {
    financeByMonth1: function(income = true) {
      let typeName = income ? 'Income' : 'Expense'
      if (!this.paymentPlan.elements || this.paymentPlan.length === 0) return []
      return this.paymentPlan.elements
        .filter(value => value.elementType === typeName)
        .map(value => {
          value.amount = value.paymentAmount
          value.startDate = value.paymentDate
          value.reason = value.title
          return value
        })
    },
    financeByMonth: function(finance) {
      if (finance) finance = this.incomes
      else finance = this.expenses
      return finance
        .map(value => {
          return this.calculate_dates(value)
        })
        .filter(
          value =>
            this.date_in_range(value) ||
            (this.currentMonth === value.start_date.month() &&
              this.currentYear === value.start_date.year())
        )
    },
    date_in_range: function(d) {
      let range = d.dates
      for (let i = 0; i < range.length; i++) {
        if (
          range[i].year() === this.currentYear &&
          range[i].month() === this.currentMonth
        ) {
          return true
        }
      }
      return false
    },
    calculate_dates: function(item) {
      if (item.recurrentCount < 0) return this.calculate_endless_dates(item)
      let start_date = this.$moment(item.startDate)
      let dates = []
      for (let i = 0; i < item.recurrentCount; i++) {
        dates.push(
          this.$moment(item.startDate).add(this.periods[item.paymentPeriod], i)
        )
      }
      item.start_date = start_date
      item.end_date = this.$moment(item.startDate).add(
        this.periods[item.paymentPeriod],
        item.recurrentCount
      )
      item.dates = dates
      return item
    },
    calculate_endless_dates: function(item) {
      let start_date = this.$moment(item.startDate)
      let dates = []
      let date = start_date.clone()
      let counter = 0
      while (date.year() <= this.currentYear && counter < 1000) {
        dates.push(
          this.$moment(item.startDate).add(
            this.periods[item.paymentPeriod],
            counter++
          )
        )
        date = dates[dates.length - 1]
      }
      item.start_date = start_date
      item.end_date = dates[dates.length - 1]
      item.dates = dates
      return item
    },
    load_agenda() {
      let from = this.$moment()
        .month(this.currentMonth)
        .date(1)
      let to = from.clone().add(1, 'M')
      this.$store.dispatch('client/load_agenda', [
        from.toISOString(),
        to.toISOString()
      ])
    },
    changeMonth(forward = true) {
      if (forward) {
        if (this.currentMonth === 11) {
          this.currentMonth = 0
          this.currentYear++
        } else this.currentMonth++
      } else {
        if (this.currentMonth === 0) {
          this.currentMonth = 11
          this.currentYear--
        } else this.currentMonth--
      }
      this.update_endless()
      // this.load_agenda()
    },
    update_endless: function() {
      this.expenses.map(value => {
        if (value.recurrentCount < 0) return this.calculate_endless_dates(value)
        else return value
      })
    },
    resetTime: function() {
      this.currentMonth = new Date().getMonth()
      this.currentYear = new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
/*он используется на самом деле*/
.el-row {
  margin-bottom: 12px;
}

.low_balance {
  background-color: #e6a23c;
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
