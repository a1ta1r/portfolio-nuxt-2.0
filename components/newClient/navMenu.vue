<template>
  <el-menu
    :router="true"
    :default-active="activeIndex2"
    mode="horizontal"
    @select="handleSelect">
    <el-menu-item
      v-if="isAuthorized && isAdmin"
      :route="{ name: 'secure-admin' }"
      index="admin">
      {{ username }} вам сюда
    </el-menu-item>
    <el-menu-item
      v-if="isClient || !isAuthorized"
      :route="{ name: 'calculator' }"
      index="calculator">
      Калькулятор кредита
    </el-menu-item>
    <el-menu-item
      v-if="isAuthorized && isClient"
      :route="{ name: 'client' }"
      index="client">
      Личный кабинет
    </el-menu-item>
    <el-menu-item
      v-if="isAuthorized && isClient"
      :route="{ name: 'agenda' }"
      index="agenda">
      Календарь
    </el-menu-item>
    <el-menu-item
      v-if="!isAuthorized"
      :route="{ name: 'signIn' }"
      index="signIn">
      Вход
    </el-menu-item>
    <el-menu-item
      v-if="!isAuthorized"
      :route="{ name: 'signUp' }"
      index="signUp">
      Регистрация
    </el-menu-item>
    <el-menu-item
      v-if="isAuthorized && isAdvertiser"
      :route="{ name: 'advertiser' }"
      index="advertiser">
      Рекламомадатель
    </el-menu-item>
    <el-menu-item
      v-if="isAuthorized && isAdmin"
      :route="{ name: 'supersecure' }"
      index="supersecure">
      Модератор
    </el-menu-item>
    <el-menu-item
      v-if="isAuthorized"
      :route="{ name: 'signIn' }"
      index="logOut"
      @click="log_out">
      Выход
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'NavMenu',
  computed: {
    ...mapState('client', ['username', 'role']),
    ...mapState('general', ['currentPage', 'isAuthorized']),
    activeIndex2: function() {
      return this.currentPage
    },
    isAdmin: function() {
      return (
        this.role === 1 || this.role === 'Admin' || this.username === 'admin'
      )
    },
    isAdvertiser: function() {
      return this.role === 2 || this.role === 'Advertiser'
    },
    isClient: function() {
      return (
        (this.role === 0 || this.role === 'User') && this.username !== 'admin'
      )
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key
      // this.$router.push({ name: key })
      // this.$store.dispatch('general/set_route', key)
    },
    log_out() {
      this.$store.dispatch('client/log_out')
      this.$store.dispatch('general/set_authorized', false)
      this.$router.push({ name: 'signIn' })
    }
  }
}
</script>

<style scoped>
</style>
