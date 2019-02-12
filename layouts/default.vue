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
import { mapState } from 'vuex'

export default {
  components: { navMenu },
  computed: {
    ...mapState('client', ['role'])
  },
  beforeMount() {
    this.$store.dispatch('client/get_token').then(() => {
      this.$store.dispatch('client/load_user')
      if (this.token) this.$store.dispatch('general/set_authorized', true)
    })
  }
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
