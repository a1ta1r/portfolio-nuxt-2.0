<template>
  <div>
    <el-header>
      <nav-menu/>
    </el-header>
    <sign-in-com v-if="!isAuth"/>
    <user-page v-if="isClient"/>
    <main-page v-if="isAdvertiser"/>
  </div>
</template>
<script>
import signInCom from '../components/newClient/signIn-com'
import UserPage from '../components/newClient/userPage'
import { mapState } from 'vuex'
import navMenu from '../components/newClient/navMenu'
import MainPage from '../components/moderator/mainPage'
export default {
  components: { MainPage, UserPage, signInCom, navMenu },
  computed: {
    ...mapState('client', ['token', 'role']),
    ...mapState('general', ['isAuthorized']),
    isAuth: function() {
      return this.isAuthorized
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
  }
}
</script>
