<template>
  <el-card class="box-card">
    <div
      slot="header"
      class="clearfix">
      <h1>Новый рекламодатель: <label v-text="advertiser.username"/></h1>
    </div>
    <el-form
      ref="advertiser"
      :model="advertiser"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm">
      <el-form-item
        label="Название"
        prop="username">
        <el-input v-model="advertiser.username"/>
      </el-form-item>
      <el-form-item
        label="Логин (email)"
        prop="email">
        <el-input v-model="advertiser.email"/>
      </el-form-item>
      <el-form-item
        label="Пароль"
        prop="password">
        <el-input v-model="advertiser.password"/>
      </el-form-item>
      <el-form-item
        label="Активен"
        prop="isActive">
        <el-switch
          v-model="advertiser.isActive"
          active-color="#13ce66"/>
      </el-form-item>
      <el-form-item
        label="Контактная информация"
        prop="contactInfo">
        <el-input
          v-model="advertiser.contactInfo"
          type="textarea"/>
      </el-form-item>
      <el-form-item
        label="Заметки"
        prop="notes">
        <el-input
          v-model="advertiser.notes"
          type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('advertiser')">Добавить</el-button>
        <el-button @click="resetForm('advertiser')">Сбросить</el-button>
        <el-button @click="back">Назад</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      advertiser: {
        email: '',
        username: '',
        password: '',
        isActive: true,
        contactInfo: '',
        notes: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: 'Пожалуйста, введите название нового рекламодателя',
            trigger: 'blur'
          },
          {
            min: 3,
            message: 'Длина имени должна быть больше 3 символов',
            trigger: ['change', 'blur']
          },
          { validator: this.usernameValidator, trigger: 'blur' }
        ],
        password: [
          {
            required: true,
            message: 'Пожалуйста, введите пароль для рекламодателя',
            trigger: 'blur'
          },
          {
            min: 3,
            message: 'Длина должна быть больше 3 символов',
            trigger: 'change'
          }
        ],
        email: [
          {
            required: true,
            message: 'Пожалуйста, введите адрес электронной почты',
            trigger: 'blue'
          },
          {
            type: 'email',
            message: 'Пожалуйста, введите корректный адрес электронной почты',
            trigger: 'blur'
          },
          { validator: this.emailValidator, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('admin', ['advertisers'])
  },
  mounted() {
    if (this.$store.state.admin.advertisers.length === 0) {
      this.$store.dispatch('load_advertisers')
    }
  },
  methods: {
    usernameValidator(rule, value, callback) {
      if (this.advertisers.findIndex(x => x.username === value) !== -1) {
        callback(new Error('Рекламодатель с таким названием уже существует'))
      }
      callback()
    },
    emailValidator(rule, value, callback) {
      if (this.advertisers.findIndex(x => x.email === value) !== -1) {
        callback(new Error('Рекламодатель с таким email уже существует'))
      }
      callback()
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch('admin/add_advertiser', this.advertiser)
            .then(() => {
              this.$router.push('/secure/admin')
              this.notify()
            })
            .catch(() => {
              this.notifyFail()
            })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    back() {
      this.$router.push('/secure/admin')
    },
    notify() {
      this.$notify.success({
        title: `Рекламодатель ${this.advertiser.username} успешно добавлен`,
        message: `На адрес ${
          this.advertiser.email
        } будет выслано письмо с информацией для входа`,
        position: 'bottom-right'
      })
    },
    notifyFail() {
      this.$notify.error({
        title: `Рекламодатель ${this.advertiser.username} не был добавлен`,
        message: `При добавлении рекламодателя произошла ошибка. Проверьте, что введенные данные верны`,
        position: 'bottom-right'
      })
    }
  }
}
</script>
