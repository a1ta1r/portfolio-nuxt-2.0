<template>
  <div>
    <el-header>
      <nav-menu/>
    </el-header>
    <calculator-com/>
  </div>
</template>
<script>
import navMenu from '../../components/newClient/navMenu'
import CalculatorCom from '../../components/newClient/calculator-com'
export default {
  name: 'Calculator',
  components: { CalculatorCom, navMenu },
  mounted() {
    this.$store.dispatch('general/set_route', 'calculator')
  }
}
</script>

<style scoped>
</style>
