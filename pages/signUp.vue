<template>
  <div>
    <el-header>
      <nav-menu/>
    </el-header>
    <sign-up-com/>
  </div>
</template>

<script>
import signUpCom from '../components/newClient/signUp-com'
import navMenu from '../components/newClient/navMenu'
export default {
  name: 'SignUp',
  components: { signUpCom, navMenu },
  mounted() {
    this.$store.dispatch('general/set_route', 'signUp')
  }
}
</script>

<style scoped>
</style>
