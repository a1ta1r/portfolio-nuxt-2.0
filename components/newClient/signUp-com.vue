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
          <h1 align="center">Создать аккаунт</h1>
          <el-form
            ref="signInForm"
            :model="user"
            :rules="rules"
            :label-position="labelPosition"
            label-width="100px"
            class="main-form">
            <el-form-item
              prop="email"
              label="Почта">
              <el-input
                v-model="user.email"
                type="email" />
            </el-form-item>
            <el-form-item
              prop="username"
              label="Логин">
              <el-input v-model="user.username"/>
            </el-form-item>
            <el-form-item
              prop="password"
              label="Пароль">
              <el-input
                v-model="user.password"
                type="password"/>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="signin('signInForm')">Регистрация</el-button>
              <el-button @click="gosignin" >Уже есть аккаунт?</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SignUpCom',
  data: function() {
    return {
      user: {
        email: '',
        username: '',
        password: ''
      },
      invalidCredentials: false,
      rules: {
        email: [
          {
            required: true,
            message: 'Введите электронную почту',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: 'Электронная почта не корректна',
            trigger: 'blur'
          }
        ],
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
    labelPosition: function() {
      if (this.$mq === 'sm') return 'top'
      else return 'right'
    }
  },
  methods: {
    ...mapActions('client', ['sign_up']),
    signin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.sign_up(this.user).then(result => {
            if (result === true) {
              this.$router.push({ name: 'index' })
            } else {
              this.invalidCredentials = true
              alert(result.data.message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    gosignin: function() {
      this.$router.push({ name: 'signIn' })
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
