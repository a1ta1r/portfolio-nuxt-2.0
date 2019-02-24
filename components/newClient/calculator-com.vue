<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <el-card class="box-card">
      <el-row>
        <el-col :span="24"><h2 align="center">Кредитный калькулятор</h2></el-col>
      </el-row>
      <el-row :gutter="8">
        <el-col
          :xs="0"
          :sm="4"
          :md="5"
          :lg="7"
          :xl="8">
          <el-card
            :body-style="{ padding: '5px' }">
            <el-carousel
              :interval="7000"
              style="height: 505px"
              indicator-position="none"
              arrow="never"
              height="504px">
              <el-carousel-item
                v-for="item in 4"
                :key="item"
                style="height: 505px"/>
            </el-carousel>
          </el-card>
        </el-col>
        <el-col
          :xs="24"
          :sm="16"
          :md="14"
          :lg="10"
          :xl="8">
          <el-card class="box-card">
            <el-form
              ref="calcForm"
              :model="calcForm"
              :rules="rules"
              :label-position="labelPosition"
              label-width="160px">
              <el-form-item
                label="Название кредита"
                prop="title">
                <el-input
                  v-model="calcForm.title"
                  style="width: 90%;"
                  clearable/>
              </el-form-item>
              <el-form-item
                label="Сумма кредита, ₽"
                prop="paymentAmount">
                <vue-numeric
                  v-model="calcForm.paymentAmount"
                  :min="1"
                  output-type="Number"
                  class="el-input__inner"
                  separator="space"
                  currency-symbol-position="suffix"
                  currency="₽"
                  style="width: 90%;"/>
              </el-form-item>
              <el-form-item
                label="Количество месяцев"
                prop="numberOfMonths">
                <el-input-number
                  v-model="calcForm.numberOfMonths"
                  :min="1"
                  :max="600"
                  controls-position="right"
                  style="width: 45%;"/>
              </el-form-item>
              <el-form-item
                label="Процент в год, %"
                prop="interestRate">
                <el-input-number
                  v-model="calcForm.interestRate"
                  :min="0.01"
                  :max="100"
                  controls-position="right"
                  style="width: 45%;"/>
              </el-form-item>
              <el-form-item
                label="Начало платежей"
                prop="startDate">
                <el-date-picker
                  v-model="calcForm.startDate"
                  :picker-options="pickerOptions"
                  type="date"
                  format="dd-MM-yyyy"
                  class="flex-item"
                  style="width: 90%;"/></el-form-item>
              <el-form-item
                label="Тип выплат"
                prop="paymentType">
                <el-select
                  v-model="calcForm.paymentType"
                  style="width: 90%;">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitForm('calcForm')">Рассчитать</el-button>
                <el-button @click="resetForm('calcForm')">Сбросить</el-button>
                <el-button
                  type="info"
                  icon="el-icon-document"
                  circle
                  @click="calcForm.showCreditDescription = !calcForm.showCreditDescription"/>
              </el-form-item>
              <transition name="el-zoom-in-top">
                <div v-show="calcForm.showCreditDescription">
                  <div align="left">
                    <div><strong>Аннуитетный:</strong> равные выплаты каждый месяц</div>
                    <div><strong>Дифференцированный</strong> вычисляется следующим образом:
                      <ul style="margin: 0">ДП = ОСЗ / ПП + ОСЗ х ПС , где
                        <li>ДП - размер дифференцированного платежа</li>
                        <li>ОСЗ - остаток ссудной задолженности</li>
                        <li>ПП - количество периодов, оставшихся до погашения кредита</li>
                        <li>ПС - месячная процентная ставка по кредитному договору, равная 1/12 годовой процентной ставки</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </transition>
            </el-form>
          </el-card>
          <el-card v-if="calcForm.paymentPlan.totalPaymentAmount">
            <el-form>
              <el-row>
                <el-col :span="18">
                  <el-form-item
                    label="Итоговая сумма платежей"
                    style="margin-bottom: 0">
                    <vue-numeric
                      :value="calcForm.paymentPlan.totalPaymentAmount"
                      :precision="2"
                      separator="space"
                      currency-symbol-position="suffix"
                      currency="₽"
                      read-only/>
                  </el-form-item>
                  <el-form-item label="Переплата по кредиту">
                    <vue-numeric
                      :value="calcForm.paymentDifference"
                      :precision="2"
                      separator="space"
                      currency-symbol-position="suffix"
                      currency="₽"
                      read-only/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <br>
                  <el-button
                    type="primary"
                    @click="saveCredit()">Сохранить</el-button>
                </el-col>
              </el-row>
            </el-form>
            <PaymentsTable
              :payments="currentPayments"
              :page="calcForm.pagination.page"
              :my-payment-plan="getPaymentsAmount"
              :total="calcForm.paymentPlan.totalPaymentAmount"/>
            <Paginator
              v-model="calcForm.pagination"
              :limit="calcForm.pagination.limit"
              :length="calcForm.paymentPlan.paymentList.length"/>
          </el-card>
        </el-col>
        <el-col
          :xs="0"
          :sm="4"
          :md="5"
          :lg="7"
          :xl="8">
          <el-card
            :body-style="{ padding: '5px' }">
            <el-carousel
              :interval="7000"
              :initial-index = "2"
              style="height: 505px"
              indicator-position="none"
              arrow="never"
              height="504px">
              <el-carousel-item
                v-for="item in 4"
                :key="item"
                style="height: 505px"/>
            </el-carousel>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VueNumeric from 'vue-numeric'
import PaymentsTable from './paymentsTable'
import Paginator from './paginator'
import PaymentPlan from '../../models/paymentPlan'
import Calculator from '../../services/calculator'
import User from '../../models/user'

export default {
  name: 'CalculatorCom',
  components: { PaymentsTable, Paginator, VueNumeric },
  data() {
    return {
      calcForm: {
        title: 'Кредит №1',
        paymentType: 'Аннуитетный',
        paymentAmount: 50000,
        interestRate: 12,
        numberOfMonths: 12,
        paymentList: {},
        startDate: Date.now(),
        totalPaymentAmount: 0,
        even: PaymentPlan.LoanTypes.Even,
        diff: PaymentPlan.LoanTypes.Differentiated,
        user: {},
        paymentPlan: new PaymentPlan(),
        planToSave: null,
        pagination: {
          page: 1,
          limit: 12,
          offset: 0
        },
        paymentDifference: 0,
        showCreditDescription: false
      },
      options: [
        {
          value: 'Аннуитетный',
          label: 'Аннуитетный'
        },
        {
          value: 'Дифференцированный',
          label: 'Дифференцированный'
        }
      ],
      rules: {
        title: [
          {
            required: true,
            message: 'Введите название',
            trigger: 'blur'
          }
        ],
        paymentAmount: [
          {
            required: true,
            message: 'Введите размер кредита',
            trigger: 'change'
          }
        ],
        numberOfMonths: [
          {
            required: true,
            message: 'Введите кол-во месяцев',
            trigger: 'blur'
          }
        ],
        interestRate: [
          {
            required: true,
            message: 'Введите процент',
            trigger: 'blur'
          }
        ],
        startDate: [
          {
            type: 'date',
            required: true,
            message: 'Выберите дату начала',
            trigger: 'blur'
          }
        ]
      },
      pickerOptions: {
        firstDayOfWeek: 1
      }
    }
  },
  computed: {
    ...mapState('client', ['username', 'currentPage', 'expenses']),
    currentPayments: function() {
      let start =
        (this.calcForm.pagination.page - 1) * this.calcForm.pagination.limit
      let end = start + this.calcForm.pagination.limit
      return this.calcForm.paymentPlan.paymentList.slice(start, end)
    },
    getPaymentsAmount: function() {
      if (this.calcForm.paymentPlan.paymentType === this.calcForm.even) {
        return undefined
      } else {
        let result = []
        for (let i = 0; i < this.calcForm.paymentPlan.paymentList.length; i++) {
          result.push(this.calcForm.paymentPlan.paymentList[i].paymentAmount)
        }
        return result
      }
    },
    labelPosition: function() {
      if (this.$mq === 'sm') return 'top'
      else return 'right'
    }
  },
  created: function() {
    /* let user = new User('', '', '')
    user.username = localStorage.getItem('username')
    user.fetch().then(() => {
      if (user.expenses === null) user.expenses = []
      if (user.incomes === null) user.incomes = []
      if (user.paymentPlans === null) user.paymentPlans = []
      this.user = user
    }) */
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.calcForm.paymentPlan.title = this.calcForm.title
          this.calcForm.paymentPlan.paymentType = this.calcForm.paymentType
          this.calcForm.paymentPlan.paymentAmount = this.calcForm.paymentAmount
          this.calcForm.paymentPlan.interestRate = this.calcForm.interestRate
          this.calcForm.paymentPlan.startDate = new Date(
            this.calcForm.startDate
          )
          this.calcForm.paymentPlan.numberOfMonths = this.calcForm.numberOfMonths

          this.calcForm.paymentPlan = Calculator.calculate(
            this.calcForm.paymentPlan
          )
          this.calcForm.planToSave = Object.assign(this.calcForm.paymentPlan)
          this.calcForm.pagination = {
            page: 1,
            limit: 12,
            offset: 0
          }
          this.calcForm.paymentDifference =
            this.calcForm.paymentPlan.totalPaymentAmount -
            this.calcForm.paymentPlan.paymentAmount
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    saveCredit() {
      if (this.username) {
        if (this.calcForm.paymentType === 'Аннуитетный') {
          let expense = {
            reason: this.calcForm.title,
            amount: this.calcForm.paymentPlan.paymentList[0].paymentAmount,
            startDate: new Date(this.calcForm.startDate),
            isRepeatable: true,
            frequency: 1,
            paymentPeriod: 2,
            recurrentCount: this.calcForm.paymentPlan.paymentList.length
          }
          this.$store.dispatch('client/add_expense', Object.assign({}, expense))
        } else {
          for (
            let i = 0;
            i < this.calcForm.paymentPlan.paymentList.length;
            i++
          ) {
            let expense = {
              reason: this.calcForm.title,
              amount: this.calcForm.paymentPlan.paymentList[i].paymentAmount,
              startDate: this.calcForm.paymentPlan.paymentList[i].paymentDate,
              isRepeatable: false,
              frequency: 1,
              paymentPeriod: 2,
              recurrentCount: 1
            }
            this.$store.dispatch(
              'client/add_expense',
              Object.assign({}, expense)
            )
          }
        }
        let user = {
          expenses: this.expenses
        }
        this.$store.dispatch('client/update_user', user)
        this.$router.push({ name: 'client' })
        this.$notify.success({
          title: 'Кредит добавлен',
          message: 'Вы добавили новый кредит'
        })
      } else {
        this.$notify.error({
          title: 'Ошибка',
          message: 'Вы не выполнили вход'
        })
        return false
      }
    }
  }
}
</script>

<style scoped>
/*он используется на самом деле*/
.el-card {
  margin-bottom: 12px;
}

.el-carousel__item:nth-child(1) {
  background-image: url(https://www.pressfoto.ru/mediasample/s.pfst.net/2012.11/1656341880627316d171c8e1f98429118d40eba11c3_b.jpg?PressFoto_1656341.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 3px;
}
.el-carousel__item:nth-child(2) {
  background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3c26mj4YZG6BT6T-qqRwUBQBAqXyw8Uhccniij96NIL0aXtit);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 3px;
}
.el-carousel__item:nth-child(3) {
  background-image: url(http://secondstreet.ru/uploads/images/00/50/88/2012/12/11/43c003.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 3px;
}
.el-carousel__item:nth-child(4) {
  background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStNZMG25i3Ot9s-JB1yqhnf97YKliY9_03qKOzn2qURGKd2cXIpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 3px;
}
</style>
