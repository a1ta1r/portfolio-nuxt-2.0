<template>
  <el-menu
    :default-active="client"
    :router="true"
    mode="horizontal"
    @select="handleSelect">
    <el-menu-item
      :route="{ name: 'secure-admin' }"
      index="admin">
      {{ username }} вам сюда
    </el-menu-item>
    <el-menu-item
      :route="{ name: 'client' }"
      index="client">
      Обычные люди сюда
    </el-menu-item>
    <el-menu-item
      :route="{ name: 'calculator' }"
      index="calculator">
      Калькулятор кредита
    </el-menu-item>
    <el-menu-item
      :route="{ name: 'signIn' }"
      index="signIn">
      Вход
    </el-menu-item>
    <el-menu-item
      :route="{ name: 'signUp' }"
      index="signUp">
      Регистрация
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'NavMenu',
  data() {
    return {
      activeIndex: this.currentPage
    }
  },
  computed: {
    ...mapState('client', ['username', 'role', 'currentPage'])
  },
  methods: {
    handleSelect(key, keyPath) {
      // this.$router.push({ name: key })
      this.currentPage = key
    }
  }
}
</script>

<style scoped>
</style>
