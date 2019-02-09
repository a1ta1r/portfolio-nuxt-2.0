<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect">
    <el-menu-item index="secure-admin">
      {{ username }} вам сюда
    </el-menu-item>
    <el-menu-item index="client">
      Обычные люди сюда
    </el-menu-item>
    <el-menu-item index="calculator">
      Калькулятор кредита
    </el-menu-item>
    <el-menu-item index="signIn">
      Вход
    </el-menu-item>
    <el-menu-item index="signUp">
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
      activeIndex: '1'
    }
  },
  computed: {
    ...mapState('client', ['username', 'role'])
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push({ name: key })
    }
  }
}
</script>

<style scoped>
</style>
