<template>
  <nav class="navbar navbar-toggleable-sm navbar-light bg-success navbar-inverse">
    <ul class="navbar-nav">
      <li class="nav-item">
        <label class="nav-link active">Кредитный калькулятор</label>
      </li>
      <li class="nav-item">
        <router-link 
          v-if="!isLoggedIn" 
          :to="signup" 
          class="nav-link" 
          active-class="active">{{ signup.title }}</router-link>
      </li>
      <li class="nav-item">
        <router-link 
          v-if="isLoggedIn" 
          :to="userpage" 
          class="nav-link" 
          active-class="active">{{ userpage.title }}</router-link>
      </li>
      <li class="nav-item">
        <router-link 
          v-if="!isLoggedIn" 
          :to="signin" 
          class="nav-link" 
          active-class="active">{{ signin.title }}</router-link>
      </li>
      <li class="nav-item">
        <router-link 
          :to="calculator" 
          class="nav-link" 
          active-class="active">{{ calculator.title }}</router-link>
      </li>
      <li class="nav-item">
        <router-link 
          v-if="isLoggedIn" 
          :to="agenda" 
          class="nav-link" 
          active-class="active">{{ agenda.title }}</router-link>
      </li>
      <li class="nav-item">
        <router-link 
          v-if="isLoggedIn" 
          :to="credit" 
          class="nav-link" 
          active-class="active">{{ credit.title }}</router-link>
      </li>
      <li class="nav-item">
        <router-link 
          v-if="isLoggedIn" 
          :to="signout" 
          class="nav-link">{{ signout.title }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { checkLoggedIn, clearCredentials } from '../services/auth'

export default {
  name: 'Navbar',
  data() {
    return {
      main: '',
      calculator: '',
      signin: '',
      signup: '',
      signout: '',
      userpage: '',
      credit: '',
      agenda: '',
      isLoggedIn: checkLoggedIn()
    }
  },
  watch: {
    $route(to) {
      this.isLoggedIn = checkLoggedIn()
      if (to.name === this.signout.name) {
        clearCredentials()
        this.$router.push('/signin')
      }
    }
  },
  created: function() {
    let routes = []
    for (let i in this.$router.options.routes) {
      if (!this.$router.options.routes.hasOwnProperty(i)) {
        continue
      }
      let route = this.$router.options.routes[i]
      if (route.hasOwnProperty('title')) {
        routes.push(route)
      }
    }
    // this.main = routes[0]
    this.signup = routes[0]
    this.signin = routes[1]
    this.userpage = routes[2]
    this.calculator = routes[3]
    this.agenda = routes[4]
    this.credit = routes[5]
    this.signout = routes[6]
    this.isLoggedIn = checkLoggedIn()
  }
}
</script>

<style scoped>
a {
  color: #42b983;
  margin: 0 16pt;
}
</style>
