<template>
  <div>
    <el-header>
      <nav-menu/>
    </el-header>
    <agenda-com/>
  </div>
</template>
<script>
import navMenu from '../../components/newClient/navMenu'
import AgendaCom from '../../components/newClient/agenda-com'
export default {
  name: 'Agenda',
  components: { AgendaCom, navMenu },
  mounted() {
    this.$store.dispatch('general/set_route', 'agenda')
  }
}
</script>

<style scoped>
</style>
