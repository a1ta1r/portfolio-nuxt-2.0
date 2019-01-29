<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <div class="col-md-4">
      <div
        :class="{'has-danger':errors.first('email') != null}"
        class="form-group">
        <label for="email">Электронная почта:</label>
        <input
          v-validate="'required|email'"
          id="email"
          v-model="settings.email"
          type="email"
          class="form-control"
          data-vv-as="Электронная почта"
          name="email"
          placeholder="Укажите email">
      </div>
      <span>{{ errors.first('email') }}</span>
      <div
        :class="{'has-danger':errors.first('username') != null}"
        class="form-group">
        <label for="username">Имя пользователя:</label>
        <input
          v-validate="'required|alpha_num'"
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
          v-validate="{ required: true, min: 3}"
          id="password"
          v-model="settings.password"
          type="password"
          class="form-control"
          name="password"
          data-vv-as="Пароль"
          placeholder="Укажите пароль">
      </div>
      <span>{{ errors.first('password') }}</span>
      <div
        :class="{'has-danger':errors.has('password_confirmation')}"
        class="form-group">
        <label for="password_confirmation">Подтверждение пароля:</label>
        <input
          v-validate="{ required: true, confirmed: settings.password}"
          id="password_confirmation"
          v-model="settings.password_confirmation"
          type="password"
          class="form-control"
          data-vv-as="Подтверждение пароля"
          name="password_confirmation"
          placeholder="Подтвердите пароль">
      </div>
      <span v-if="errors.has('password_confirmation')">Введенные пароли должны совпадать.</span>
      <div>
        <button
          id="confirm_btn"
          type="button"
          class="btn btn-primary"
          @click="signup">ОК</button>
      </div>
    </div>
  </div>
</template>

<script>
import User from '../models/user'
import { signIn } from '../services/auth'

export default {
  name: 'Signup',
  data: function() {
    return {
      settings: {
        email: '',
        username: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    signup: signup(formName) {
  this.$refs[formName].validate((valid) => {
    if (valid) {
      alert('submit!');
    } else {
      console.log('error submit!!');
      return false;
    }
  });
},
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
