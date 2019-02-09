<template>
  <sign-in-com v-if="isAuth"/>
  <user-page v-else/>
</template>
<script>
import signInCom from '../components/newClient/signIn-com'
import UserPage from '../components/newClient/userPage'
import { mapState } from 'vuex'

export default {
  components: { UserPage, signInCom },
  computed: {
    ...mapState('client', ['token']),
    isAuth: function() {
      return this.token === ''
    }
  }
}
</script>
