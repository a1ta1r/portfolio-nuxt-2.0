<template>
  <el-form
    ref="currentIncomeForm"
    :model="currentIncome"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm">
    <el-form-item
      label="Источник"
      prop="reason">
      <el-input v-model="currentIncome.reason"/>
    </el-form-item>
    <el-form-item
      label="Сумма"
      prop="amount">
      <el-input v-model="currentIncome.amount"/>
    </el-form-item>
    <el-form-item
      label="Период"
      prop="paymentPeriod">
      <el-radio-group
        v-model="currentIncome.paymentPeriod"
        size="small">
        <el-radio-button label="Единовременный"/>
        <el-radio-button label="День"/>
        <el-radio-button label="Неделя"/>
        <el-radio-button label="Месяц"/>
        <el-radio-button label="Квартал"/>
        <el-radio-button label="Год"/>
      </el-radio-group>
    </el-form-item>
    <el-form-item
      label="Срок"
      prop="frequency" >
      <el-input v-model="currentIncome.frequency"/>
    </el-form-item>
    <el-form-item
      label="Дата начала"
      prop="date">
      <el-date-picker
        v-model="currentIncome.startDate"
        type="startDate"
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
import { mapState, mapActions } from 'vuex'
export default {
  name: 'IncomeExpenseAddForm',
  props: {
    currentIncome: {
      type: Object,
      default: () => {
        return {
          isIncome: true,
          amount: 0,
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
            message: 'Введите что-то',
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
            required: true,
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
          this.currentIncome.frequency = parseInt(
            this.currentIncome.frequency,
            10
          )

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
    }
  }
}
</script>

<style scoped>
</style>
