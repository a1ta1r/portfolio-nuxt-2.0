<template>
  <div>
    <el-header>
      <nav-menu/>
    </el-header>
    <main-page/>
  </div>
</template>

<script>
import mainPage from '../../components/moderator/mainPage'
import navMenu from '../../components/newClient/navMenu'
export default {
  name: 'Moderator',
  components: { navMenu, mainPage },
  mounted() {
    this.$store.dispatch('general/set_route', 'supersecure')
  }
}
</script>

<style scoped>
</style>
