<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <div 
      v-if="invalidCredentials" 
      class="alert alert-danger">
      <button 
        type="button" 
        class="close" 
        data-dismiss="alert" 
        aria-hidden="true" 
        @click="hideAlert">&times;</button>
      <strong>Ошибка</strong> неверный логин или пароль
    </div>
    <div class="col-md-4">
      <div 
        :class="{'has-danger':errors.first('username') != null}" 
        class="form-group">
        <label for="username">Имя пользователя:</label>
        <input 
          v-validate="'required'" 
          id="username" 
          v-model="settings.username" 
          type="text" 
          class="form-control"
          name="username" 
          data-vv-as="Имя пользователя" 
          placeholder="Укажите имя пользователя">
      </div>
      <span>{{ errors.first('username') }}</span>
      <div 
        :class="{'has-danger':errors.has('password')}" 
        class="form-group">
        <label for="password">Пароль:</label>
        <input 
          v-validate="'required'" 
          id="password" 
          v-model="settings.password" 
          type="password" 
          class="form-control"
          name="password" 
          data-vv-as="Пароль" 
          placeholder="Укажите пароль">
      </div>
      <span>{{ errors.first('password') }}</span>
      <div>
        <button 
          id="confirm_btn" 
          type="submit" 
          class="btn btn-primary" 
          @click="signin">Войти</button>
      </div>
    </div>
  </div>
</template>

<script>
import { signIn } from '../services/auth'

export default {
  name: 'Signin',
  data: function() {
    return {
      settings: {
        username: '',
        password: ''
      },
      invalidCredentials: false
    }
  },
  methods: {
    signin: function() {
      this.$validator
        .validateAll()
        .then(success => {
          if (success) {
            signIn(this.settings.username, this.settings.password)
              .then(() => {
                this.$router.push('/user/profile')
              })
              .catch(error => {
                console.log('sign in error: ' + error.message)
                this.invalidCredentials = true
              })
          }
        })
        .catch(error => {
          console.log('validation error: ' + error.message)
        })
    },
    hideAlert: function() {
      this.invalidCredentials = false
    }
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 0;
}

label {
  margin-top: 16px;
}

span {
  color: #d9534f;
}

#confirm_btn {
  margin-top: 16px;
}
</style>
