<template>
  <div>
    <el-header>
      <nav-menu/>
    </el-header>
    <advertiser-page/>
  </div>
</template>

<script>
import advertiserPage from '../../components/advertiser/advertiserPage'
import navMenu from '../../components/newClient/navMenu'
export default {
  name: 'Advertiser',
  components: { advertiserPage, navMenu },
  mounted() {
    this.$store.dispatch('general/set_route', 'advertiser')
  }
}
</script>

<style scoped>
</style>
