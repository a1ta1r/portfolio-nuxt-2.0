<template>
  <div>
    <el-header>
      <nav-menu/>
    </el-header>
    <sign-in-com v-if="!isAuth"/>
    <user-page v-else/>
  </div>
</template>
<script>
import signInCom from '../components/newClient/signIn-com'
import UserPage from '../components/newClient/userPage'
import { mapState } from 'vuex'
import navMenu from '../components/newClient/navMenu'
export default {
  components: { UserPage, signInCom, navMenu },
  computed: {
    ...mapState('client', ['token']),
    ...mapState('general', ['isAuthorized']),
    isAuth: function() {
      return this.isAuthorized
    }
  }
}
</script>
