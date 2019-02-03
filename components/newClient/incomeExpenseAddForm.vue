<template>
  <el-form
    ref="currentIncomeForm"
    :model="currentIncome"
    :rules="rules"
    label-width="150px"
    class="demo-ruleForm">
    <el-form-item
      label="Источник"
      prop="reason">
      <el-input
        v-model="currentIncome.reason"
        style="width: 476px"/>
    </el-form-item>
    <el-form-item
      label="Сумма"
      prop="amount">
      <el-input-number
        v-model="currentIncome.amount"
        :min="0.01"
        controls-position="right"/>
    </el-form-item>
    <el-form-item
      label="Период"
      prop="paymentPeriod">
      <el-radio-group
        ref="paymentPeriodRef"
        v-model="currentIncome.paymentPeriod"
        size="small"
        @change="changePaymentPeriod('paymentPeriodRef')">
        <el-radio-button label="Единовременный"/>
        <el-radio-button label="День"/>
        <el-radio-button label="Неделя"/>
        <el-radio-button label="Месяц"/>
        <el-radio-button label="Квартал"/>
        <el-radio-button label="Год"/>
      </el-radio-group>
    </el-form-item>
    <el-form-item
      label="Кол-во периодов"
      prop="frequency" >
      <el-input-number
        ref="frequencyRef"
        v-model="currentIncome.frequency"
        :min="0"
        :disabled="false"
        controls-position="right"/>
    </el-form-item>
    <el-form-item
      label="Дата начала"
      prop="date">
      <el-date-picker
        v-model="currentIncome.startDate"
        type="date"
        class="flex-item"/>
    </el-form-item>
    <el-form-item>
      <el-switch
        v-model="currentIncome.isIncome"
        style="display: block"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="Доход"
        inactive-text="Расход"/>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm('currentIncomeForm')">Сохранить</el-button>
      <el-button @click="resetForm('currentIncomeForm')">Сбросить</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'IncomeExpenseAddForm',
  props: {
    currentIncome: {
      type: Object,
      default: () => {
        return {
          isIncome: true,
          amount: 1000,
          reason: '',
          paymentPeriod: '',
          frequency: '',
          startDate: new Date(Date.now()),
          isRepeatable: false
        }
      }
    }
  },
  data() {
    return {
      rules: {
        reason: [
          {
            required: true,
            message: 'Введите источник',
            trigger: 'blur'
          }
        ],
        amount: [
          {
            required: true,
            message: 'Введите сумму',
            trigger: 'blur'
          }
        ],
        frequency: [
          {
            required: false,
            message: 'Требуется число',
            trigger: 'change'
          }
        ],
        startDate: [
          {
            type: 'date',
            required: true,
            message: 'Выберите дату начала',
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('client', ['username', 'expenses', 'incomes'])
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.currentIncome.amount = parseFloat(this.currentIncome.amount, 10)

          if (this.currentIncome.paymentPeriod === 'Единовременный') {
            this.currentIncome.frequency = 0
          } else {
            this.currentIncome.frequency = parseInt(
              this.currentIncome.frequency,
              10
            )
          }

          this.currentIncome.isRepeatable =
            this.currentIncome.paymentPeriod === 'Единовременный'

          if (this.currentIncome.isIncome)
            this.$store.dispatch(
              'client/add_income',
              Object.assign({}, this.currentIncome)
            )
          else
            this.$store.dispatch(
              'client/add_expense',
              Object.assign({}, this.currentIncome)
            )
          this.currentIncome = {
            isIncome: this.currentIncome.isIncome,
            amount: this.amount,
            reason: this.reason,
            paymentPeriod: this.paymentPeriod,
            frequency: this.frequency,
            startDate: new Date(Date.now()),
            isRepeatable: this.isRepeatable
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    changePaymentPeriod(value) {
      this.$refs['frequencyRef'].disabled =
        this.$refs[value].value === 'Единовременный'
    }
  }
}
</script>

<style scoped>
</style>
