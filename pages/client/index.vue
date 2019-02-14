<template>
  <div>
    <el-header>
      <nav-menu/>
    </el-header>
    <user-page/>
  </div>
</template>
<script>
import navMenu from '../../components/newClient/navMenu'
import userPage from '../../components/newClient/userPage'
export default {
  name: 'Client',
  components: { userPage, navMenu },
  mounted() {
    this.$store.dispatch('general/set_route', 'client')
  }
}
</script>

<style scoped>
</style>
