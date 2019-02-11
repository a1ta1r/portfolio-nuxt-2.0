<template>
  <calculator-com/>
</template>
<script>
import CalculatorCom from '../../components/newClient/calculator-com'
export default {
  name: 'Calculator',
  components: { CalculatorCom },
  mounted() {
    this.$store.dispatch('general/set_route', 'calculator')
  }
}
</script>

<style scoped>
</style>
