<template>
  <el-row
    type="flex"
    class="row-bg"
    justify="center">
    <el-col
      :xs="22"
      :sm="18"
      :md="16"
      :lg="11"
      :xl="8">
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
            ref="signInForm"
            :model="user"
            :rules="rules"
            :label-position="labelPosition"
            label-width="100px"
            class="main-form">
            <el-form-item
              prop="username"
              label="Логин">
              <el-input
                v-model="user.username"
                clearable/>
            </el-form-item>
            <el-form-item
              prop="password"
              label="Пароль">
              <el-input
                v-model="user.password"
                type="password"
                clearable/>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="signin('signInForm')">Вход</el-button>
              <el-button @click="registr" >Регистрация?</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SignInCom',
  data: function() {
    return {
      user: {
        username: '',
        password: ''
      },
      invalidCredentials: false,
      rules: {
        username: [
          {
            required: true,
            message: 'Введите логин',
            trigger: 'blur'
          },
          {
            min: 3,
            message: 'Коротоват',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Пароль тоже необходим',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('client', ['username', 'password', 'role', 'currentPage']),
    labelPosition: function() {
      if (this.$mq === 'sm') return 'top'
      else return 'right'
    }
  },
  methods: {
    ...mapActions('client', ['sign_in']),
    signin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.sign_in(this.user).then(result => {
            if (result.data.code < 300) {
              if (this.username === 'admin' || this.role > 0)
                this.$router.push({ name: 'secure-admin' })
              else this.$router.push({ name: 'client' })
            } else {
              this.invalidCredentials = true
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    hideAlert: function() {
      this.invalidCredentials = false
    },
    registr: function() {
      this.$router.push({ name: 'signUp' })
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
