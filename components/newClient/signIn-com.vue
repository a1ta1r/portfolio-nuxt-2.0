<template>
  <el-row
    type="flex"
    class="row-bg"
    justify="center">
    <el-col span="10">
      <el-row class="card-center">
        <el-card>
          <div
            v-if="invalidCredentials"
            class="alert alert-danger">
            <el-button
              class="close"
              data-dismiss="alert"
              aria-hidden="true"
              @click="hideAlert">&times;</el-button>
            <strong>Ошибка</strong> неверный логин или пароль
          </div>
          <h1 align="center">Мир рекламы</h1>
          <el-form
            :model="user"
            :label-position="right"
            label-width="100px"
            class="main-form">
            <el-form-item
              prop="username"
              label="Логин">
              <el-input v-model="user.username"/>
            </el-form-item>
            <el-form-item
              prop="password"
              label="Пароль">
              <el-input v-model="user.password"/>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="signin">Вход</el-button>
              <el-button >Регистрация?</el-button>
            </el-form-item>
          </el-form>

        </el-card>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'SignInCom',
  data: function() {
    return {
      user: {
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
.card-center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}
.main-form {
  padding: 24px;
}
</style>
