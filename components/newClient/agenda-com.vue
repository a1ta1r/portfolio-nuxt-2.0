<template>
  <full-calendar
    ref="calendar"
    :config="config"
    :events="loadAgenda"/>
</template>

<script>
import { mapState } from 'vuex'
// import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.css'

export default {
  name: 'AgendaCom',
  data() {
    return {
      events: [],
      config: {
        defaultView: 'month',
        locale: 'ru'
      }
    }
  },
  computed: {
    ...mapState('client', ['paymentPlan']),
    ...mapState('general', ['isAuthorized']),
    loadAgenda: function() {
      let result = []
      for (let i = 0; i < this.paymentPlan.count; i++) {
        if (this.paymentPlan.elements[i].elementType === 'Income') {
          result.push({
            allDay: true,
            title:
              'Доход: ' +
              this.paymentPlan.elements[i].paymentAmount.toFixed(2) +
              ' руб.\n Источник: ' +
              this.paymentPlan.elements[i].title,
            start: new Date(this.paymentPlan.elements[i].paymentDate),
            backgroundColor: '#409eff'
          })
        } else {
          result.push({
            allDay: true,
            title:
              'Расход: ' +
              this.paymentPlan.elements[i].paymentAmount.toFixed(2) +
              ' руб.\n Источник: ' +
              this.paymentPlan.elements[i].title,
            start: new Date(this.paymentPlan.elements[i].paymentDate),
            backgroundColor: '#f56c6c'
          })
        }
      }
      return result
    }
  },
  mounted() {
    if (this.isAuthorized) this.$store.dispatch('client/load_agenda')
  }
}
</script>

<style scoped>
</style>
