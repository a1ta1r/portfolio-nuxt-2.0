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
            :disabled="isForever"
            controls-position="right"
            class="transition-box"/>
          <el-checkbox
            v-model="isForever"
            style="margin-left: 20pt"
            @change="checkClick">Бессрочный</el-checkbox>
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
  </el-form>
</template>

<script>
export default {
  name: 'IncomeExpenseEditDialog',
  props: {
    currentIncome: {
      type: Object,
      default: () => {
        return {
          isIncome: true,
          amount: 1000,
          reason: '',
          paymentPeriod: '',
          frequency: 0,
          startDate: new Date(Date.now()),
          isRepeatable: false
        }
      }
    }
  },
  data() {
    return {
      tempFrequency: 0
    }
  },
  computed: {
    isForever: function() {
      return this.currentIncome.frequency < 0
    }
  },
  methods: {
    checkClick: function(value) {
      if (value) {
        this.tempFrequency = this.currentIncome.frequency
        this.currentIncome.frequency = -1
      } else this.currentIncome.frequency = this.tempFrequency
    }
  }
}
</script>

<style scoped>
.radio-sm {
  margin-bottom: 8px;
}
</style>
