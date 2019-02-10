<template>
  <div>
    <el-aside>
      <nav-menu/>
    </el-aside>
    <nuxt/>
  </div>
</template>

<script>
import navMenu from '../components/newClient/navMenu'
export default {
  components: { navMenu }
}
</script>

<style scoped>
</style>
