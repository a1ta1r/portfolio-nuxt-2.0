<script>
import { Bar, mixins } from 'vue-chartjs'

export default {
  name: 'UsersChart',
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
      default: () => {},
      type: Object
    },
    options: {
      default: () => {},
      type: Object
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
