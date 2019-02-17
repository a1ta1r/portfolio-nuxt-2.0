<template>
  <div>
    <el-date-picker
      v-model="dateRange"
      :picker-options="quickDateRanges"
      type="daterange"
      align="right"
      unlink-panels
      start-placeholder="Дата начала"
      end-placeholder="Дата окончания"/>
    <finance-chart
      :chart-data="currentDataset"
      :options="options"
      :height="100"
      class="Chart"/>

    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix">
        <span>Финансовая информация</span>
      </div>
      <div class="text item">
        <p class="text item">Выручка за текущий месяц: {{ incomeInfo.rawIncome }}</p>
        <p class="text item">Расход за текущий месяц: {{ expenseInfo.tax }}</p>
        <p class="text item">Расход на страховые взносы: {{ expenseInfo.insurance }}</p>
        <p class="text item">Доход за текущий месяц: {{ incomeInfo.income }}</p>
        <p class="text item">Кумулятивный доход: {{ incomeInfo.totalIncome }}</p>
        <p class="text item">Наибольший доход от: {{ incomeInfo.bestAds }}</p>
        <el-tag class="text item">Формула расчета дохода: Выручка - НДС - Cтраховые взносы</el-tag>
      </div>
    </el-card>
  </div>
</template>

<script>
import FinanceChart from './financeChart'

export default {
  name: 'Finance',
  components: { FinanceChart },
  data() {
    return {
      totalData: {
        labels: [
          this.newDate(-6),
          this.newDate(-4),
          this.newDate(-2),
          this.newDate(0),
          this.newDate(2),
          this.newDate(4),
          this.newDate(6)
        ],
        datasets: [
          {
            label: 'Прибыль',
            data: [1, 3, 4, 2, 1, 4, 2],
            backgroundColor: ['rgba(64, 158, 225,.5)'],
            borderColor: ['rgba(64, 158, 225,.8)'],
            borderWidth: 3,
            pointSize: 50
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Общий доход от рекламы за период'
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Дата'
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Доход, тыс. рублей'
              },
              ticks: {
                beginAtZero: true,
                max: 5
              }
            }
          ]
        }
      },
      dateRange: '',
      quickDateRanges: {
        firstDayOfWeek: 1,
        shortcuts: [
          {
            text: 'Неделя',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: 'Месяц',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: 'Три месяца',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      incomeInfo: {
        rawIncome: '3 701.88 рублей',
        income: '2 461.50 рублей',
        totalIncome: '45 746.32 рублей',
        bestAds: 'Деньгобанк'
      },
      expenseInfo: {
        tax: '740.38 рублей (НДС 20%)',
        insurance: '500 рублей (Страховые взносы)'
      }
    }
  },
  computed: {
    currentDataset: function() {
      let fixedLabels = []
      let fixedData = []
      if (!this.dateRange) {
        fixedLabels = this.totalData.labels
        fixedData = this.totalData.datasets[0].data
      } else {
        for (let i = 0; i < this.totalData.labels.length; i++) {
          if (
            this.totalData.labels[i] >= this.dateRange[0].getTime() &&
            this.totalData.labels[i] <= this.dateRange[1].getTime()
          ) {
            fixedLabels.push(this.totalData.labels[i])
            fixedData.push(this.totalData.datasets[0].data[i])
          }
        }
      }
      return {
        labels: fixedLabels,
        datasets: [
          {
            label: 'Прибыль',
            data: fixedData,
            backgroundColor: ['rgba(64, 158, 225,.5)'],
            borderColor: ['rgba(64, 158, 225,.8)'],
            borderWidth: 3,
            pointSize: 50
          }
        ]
      }
    }
  },
  methods: {
    newDate: function(days) {
      return this.$moment().add(days, 'd')
    }
  }
}
</script>

<style scoped>
</style>
