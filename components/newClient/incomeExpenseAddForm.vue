<template>
  <el-form
    ref="currentIncomeForm"
    :model="currentIncome"
    :rules="rules"
    :label-position="labelPosition"
    label-width="150px"
    class="demo-ruleForm">
    <el-form-item
      label="Источник"
      prop="reason">
      <el-input
        v-model="currentIncome.reason"
        clearable/>
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
        v-if="$mq !== 'sm'"
        ref="paymentPeriodRef"
        v-model="currentIncome.paymentPeriod"
        size="small">
        <el-radio-button label="Единовременный"/>
        <el-radio-button label="День"/>
        <el-radio-button label="Неделя"/>
        <el-radio-button label="Месяц"/>
        <el-radio-button label="Квартал"/>
        <el-radio-button label="Год"/>
      </el-radio-group>
      <el-radio-group
        v-else
        ref="paymentPeriodRef"
        v-model="currentIncome.paymentPeriod"
        size="small">
        <el-radio
          class="radio-sm"
          label="Единовременный"/>
        <el-radio
          class="radio-sm"
          label="День"/>
        <el-radio
          class="radio-sm"
          label="Неделя"/>
        <el-radio
          class="radio-sm"
          label="Месяц"/>
        <el-radio
          class="radio-sm"
          label="Квартал"/>
        <el-radio
          class="radio-sm"
          label="Год"/>
      </el-radio-group>

    </el-form-item>
    <transition name="el-zoom-in-top">
      <div v-show="currentIncome.paymentPeriod !== 'Единовременный'">
        <el-form-item
          label="Кол-во периодов"
          prop="frequency" >
          <el-input-number
            ref="frequencyRef"
            v-model="currentIncome.frequency"
            :min="0"
            :disabled="currentIncome.isForever"
            controls-position="right"
            class="transition-box"/>
          <el-checkbox
            v-model="currentIncome.isForever"
            style="margin-left: 20pt">Бессрочный</el-checkbox>
        </el-form-item>
      </div>
    </transition>
    <el-form-item
      required
      label="Дата начала"
      prop="startDate">
      <el-date-picker
        v-model="currentIncome.startDate"
        type="date"
        format="dd-MM-yyyy"
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
import 'element-ui/lib/theme-chalk/base.css'
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
          frequency: 12,
          startDate: new Date(Date.now()),
          isRepeatable: true,
          isForever: false
        }
      }
    }
  },
  data() {
    return {
      currentIncomeLocal: this.currentIncome,
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
    ...mapState('client', ['username', 'expenses', 'incomes']),
    labelPosition: function() {
      if (this.$mq === 'sm') return 'top'
      else return 'right'
    }
  },
  methods: {
    translatePeriod(period) {
      switch (period) {
        case 'День':
          return 0
        case 'Неделя':
          return 1
        case 'Месяц':
          return 2
        case 'Квартал':
          return 3
        case 'Год':
          return 4
        case 'Единовременный':
          return 5
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.currentIncomeLocal = this.currentIncome

          this.currentIncomeLocal.amount = parseFloat(
            this.currentIncomeLocal.amount,
            10
          )

          if (this.currentIncomeLocal.paymentPeriod === 'Единовременный') {
            this.currentIncomeLocal.frequency = 0
          } else {
            this.currentIncomeLocal.frequency = parseInt(
              this.currentIncomeLocal.frequency,
              10
            )
          }

          this.currentIncomeLocal.isRepeatable =
            this.currentIncomeLocal.paymentPeriod !== 'Единовременный'

          this.currentIncomeLocal.paymentPeriod = this.translatePeriod(
            this.currentIncomeLocal.paymentPeriod
          )

          if (this.currentIncomeLocal.isForever) {
            this.currentIncomeLocal.frequency = -1
          }

          if (this.currentIncomeLocal.isIncome) {
            this.$store.dispatch(
              'client/add_income',
              Object.assign({}, this.currentIncomeLocal)
            )
            this.$notify.success({
              title: 'Доход добавлен',
              message: 'Вы добавили новый доход'
            })
          } else {
            this.$store.dispatch(
              'client/add_expense',
              Object.assign({}, this.currentIncomeLocal)
            )
            this.$notify.success({
              title: 'Расход добавлен',
              message: 'Вы добавили новый расход'
            })
          }
          let user = {
            incomes: this.incomes,
            expenses: this.expenses
          }
          this.$store.dispatch('client/update_user', user)
          this.currentIncomeLocal = {
            isIncome: this.currentIncomeLocal.isIncome,
            amount: this.amount,
            reason: this.reason,
            paymentPeriod: this.paymentPeriod,
            frequency: this.frequency,
            startDate: new Date(Date.now()),
            isRepeatable: this.isRepeatable,
            isForever: false
          }

          this.$refs[formName].resetFields()
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
.radio-sm {
  margin-bottom: 8px;
}
</style>
