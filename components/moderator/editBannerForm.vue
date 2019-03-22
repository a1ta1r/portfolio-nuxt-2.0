<template>
  <div>
    <h2>Изменить баннер {{ newBanner.text }}</h2>
    <el-form
      ref="editBannerForm"
      :model="newBanner"
      :rules="rules">
      <el-form-item
        label="Название баннера"
        prop="text">
        <el-input
          v-model="newBanner.text"
          clearable/>
      </el-form-item>
      <el-form-item
        label="Ссылка на рекламу"
        prop="advertisementLink">
        <el-input
          v-model="newBanner.advertisementLink"
          clearable/>
      </el-form-item>
      <br>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('editBannerForm')">Сохранить</el-button>
        <el-button @click="resetForm('editBannerForm')">Сбросить</el-button>
    </el-form-item></el-form>
  </div>
</template>

<script>
export default {
  name: 'EditBannerForm',
  props: {
    newBanner: {
      type: Object,
      default: () => {
        return {
          text: '',
          pictureUrl: '',
          uniqueViewsRequired: 10,
          bannerPlaceId: 1,
          advertisementId: '',
          advertisementLink: '',
          isVisible: true
        }
      }
    }
  },
  data() {
    return {
      newBannerLocal: this.newBanner,
      rules: {
        text: [
          {
            required: true,
            message: 'Введите название',
            trigger: 'blur'
          }
        ],
        advertisementLink: [
          {
            required: true,
            message: 'Введите ссылку',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.checkUrl(this.newBanner.advertisementLink)) {
            this.newBannerLocal = this.newBanner

            /*this.newBannerLocal.isVisible = true
            this.newBannerLocal.uniqueViewsRequired = 10
            this.newBannerLocal.bannerPlaceId = 1 // Тут место под баннер захардкожено, они у нас сейчас не используются
            */

            this.$store.dispatch(
              'moderator/update_banner',
              Object.assign({}, this.newBannerLocal)
            )
            this.$notify.success({
              title: 'Баннер изменён',
              message: 'Вы изменили баннер'
            })

            this.$emit('success_edit', Object.assign({}, this.newBannerLocal))

            this.$refs[formName].resetFields()
          } else {
            this.$message.error('Введите корректную ссылку на рекламу!')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    checkUrl(str) {
      const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + //port
        '(\\?[;&amp;a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$',
        'i'
      )
      return pattern.test(str)
    }
  }
}
</script>

<style scoped>
</style>
