<template>
  <sign-up-com/>
</template>

<script>
import signUpCom from '../components/newClient/signUp-com'
export default {
  name: 'SignUp',
  components: { signUpCom },
  mounted() {
    this.$store.dispatch('general/set_route', 'signUp')
  }
}
</script>

<style scoped>
</style>
