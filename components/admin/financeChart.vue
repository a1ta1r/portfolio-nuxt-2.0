<script>
import { Line, mixins } from 'vue-chartjs'

export default {
  name: 'FinanceChart',
  extends: Line,
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
