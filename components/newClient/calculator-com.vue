<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <el-card class="box-card">
      <el-row>
        <el-col :span="24"><h2 align="center">Кредитный калькулятор</h2></el-col>
      </el-row>
      <el-row>
        <el-col
          :xs="1"
          :sm="3"
          :md="4"
          :lg="7"
          :xl="8"><p/></el-col>
        <el-col
          :xs="22"
          :sm="16"
          :md="14"
          :lg="10"
          :xl="8">
          <el-card class="box-card">
            <el-form
              ref="calcForm"
              :model="calcForm"
              :rules="rules"
              label-width="200px">
              <el-form-item
                label="Название кредита"
                prop="title">
                <el-input
                  v-model="calcForm.title"
                  style="width: 243px"/>
              </el-form-item>
              <el-form-item
                label="Сумма кредита, ₽"
                prop="paymentAmount">
                <vue-numeric
                  v-model="calcForm.paymentAmount"
                  :min="0.01"
                  :max="999999999"
                  :step="1000"
                  style="width: 243px"
                  class="el-input__inner"
                  separator="space"
                  currency="₽"
                  currency-symbol-position="suffix"
                  controls-position="right"/>
              </el-form-item>
              <el-form-item
                label="Количество месяцев"
                prop="numberOfMonths">
                <el-input-number
                  v-model="calcForm.numberOfMonths"
                  :min="1"
                  :max="600"
                  style="width: 243px"
                  controls-position="right"/>
              </el-form-item>
              <el-form-item
                label="Процент в год, %"
                prop="interestRate">
                <el-input-number
                  v-model="calcForm.interestRate"
                  :min="0.01"
                  :max="100"
                  style="width: 243px"
                  controls-position="right"/>
              </el-form-item>
              <el-form-item
                label="Дата начала платежей"
                prop="startDate">
                <el-date-picker
                  v-model="calcForm.startDate"
                  style="width: 243px">
                  type="date"
                  format="dd-MM-yyyy"
                  class="flex-item"/>
              </el-date-picker></el-form-item>
              <el-form-item
                label="Тип выплат"
                prop="paymentType">
                <el-select
                  v-model="calcForm.paymentType"
                  style="width: 243px">
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
              </el-form-item>
            </el-form>
          </el-card>
          <el-card v-if="calcForm.paymentPlan.totalPaymentAmount">
            <el-form>
              <el-form-item
                label="Итоговая сумма платежей"
                style="margin-bottom: 0px">
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
          :xs="1"
          :sm="3"
          :md="4"
          :lg="7"
          :xl="8"/>
      </el-row>
    </el-card>
  </div>
</template>

<script>
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
        paymentDifference: 0
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
            trigger: 'blur'
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
      }
    }
  },
  computed: {
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
    }
  }
}
</script>

<style scoped>
/*он используется на самом деле*/
.el-card {
  margin-bottom: 12px;
}
</style>
