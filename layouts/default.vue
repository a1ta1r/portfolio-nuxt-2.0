<template>
  <div>
    <el-header>
      <nav-menu/>
    </el-header>
    <nuxt/>
  </div>
</template>

<script>
import navMenu from '../components/newClient/navMenu'
export default {
  components: { navMenu }
}
</script>

<style>
html {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}
</style>
