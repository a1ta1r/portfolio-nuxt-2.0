<template>
  <el-form
    ref="currentIncomeForm"
    :model="currentIncome"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm">
    <el-form-item
      label="Источник"
      prop="source">
      <el-input v-model="currentIncome.reason"/>
    </el-form-item>
    <el-form-item
      label="Сумма"
      prop="sum">
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
      prop="term" >
      <el-input type="number"/>
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
        @click="submitForm('ruleForm')">Сохранить</el-button>
      <el-button @click="resetForm('ruleForm')">Сбросить</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'IncomeExpenseAddForm',
  props: {
    currentIncome: {
      type: Object,
      default: () => {
        return {
          isIncome: true,
          amount: '',
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
        name: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 5,
            message: 'Length should be 3 to 5',
            trigger: 'blur'
          }
        ],
        region: [
          {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'change'
          }
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: 'Please pick a date',
            trigger: 'change'
          }
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: 'Please pick a time',
            trigger: 'change'
          }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change'
          }
        ],
        resource: [
          {
            required: true,
            message: 'Please select activity resource',
            trigger: 'change'
          }
        ],
        desc: [
          {
            required: true,
            message: 'Please input activity form',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
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
