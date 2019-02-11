<template>
  <user-page/>
</template>
<script>
import userPage from '../../components/newClient/userPage'
export default {
  name: 'Client',
  components: { userPage },
  mounted() {
    this.$store.dispatch('general/set_route', 'client')
  }
}
</script>

<style scoped>
</style>
