<template>
  <div>
    <el-header>
      <nav-menu/>
    </el-header>
    <sign-in-com/>
  </div>
</template>

<script>
import signInCom from '../components/newClient/signIn-com'
import navMenu from '../components/newClient/navMenu'
export default {
  name: 'SignIn',
  components: { signInCom, navMenu },
  mounted() {
    this.$store.dispatch('general/set_route', 'signIn')
  }
}
</script>

<style scoped>
</style>
