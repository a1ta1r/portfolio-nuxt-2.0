<template>
  <sign-in-com/>
</template>

<script>
import signInCom from '../components/newClient/signIn-com'
export default {
  name: 'SignIn',
  components: { signInCom },
  mounted() {
    this.$store.dispatch('general/set_route', 'signIn')
  }
}
</script>

<style scoped>
</style>
