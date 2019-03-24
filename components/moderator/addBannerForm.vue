<template>
  <div>
    <h2>Добавить баннер</h2>
    <el-form
      ref="addBannerForm"
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
      <el-upload
        :on-change="handleChange"
        :on-remove="handleRemove"
        :file-list="fileList"
        :limit="1"
        :before-upload="beforeUpload"
        class="upload-demo"
        drag
        show-file-list
        action="upload">
        <i class="el-icon-upload">
          ☺
        </i>
        <div class="el-upload__text">Перетащите файл сюда или <em>щелкните для загрузки</em></div>
        <div
          slot="tip"
          class="el-upload__tip">Изображения, размером менее 2 МБ</div>
      </el-upload>
      <br>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('addBannerForm')">Сохранить</el-button>
        <el-button @click="resetForm('addBannerForm')">Сбросить</el-button>
    </el-form-item></el-form>
  </div>
</template>

<script>
export default {
  name: 'AddBannerForm',
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
    },
    show_dialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileList: [],
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
    beforeUpload(file) {
      const isImage =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isImage) {
        this.$message.error('Изображение должно быть формата JPG или PNG!')
      }
      if (!isLt2M) {
        this.$message.error('Размер изображения не должен превышать 2МБ!')
      }
      return isImage && isLt2M
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.fileList.length !== 0) {
            if (this.checkUrl(this.newBanner.advertisementLink)) {
              this.newBannerLocal = this.newBanner

              this.newBannerLocal.isVisible = true
              this.newBannerLocal.uniqueViewsRequired = 10
              this.newBannerLocal.bannerPlaceId = 1 // Тут место под баннер захардкожено, они у нас сейчас не используются
              this.newBannerLocal.pictureUrl = this.fileList[0].name

              this.$store.dispatch(
                'moderator/add_banner',
                Object.assign({}, this.newBannerLocal)
              )
              this.$notify.success({
                title: 'Баннер добавлен',
                message: 'Вы добавили новый баннер'
              })

              this.$emit('success')

              this.$refs[formName].resetFields()
            } else {
              this.$message.error('Введите корректную ссылку на рекламу!')
            }
          } else {
            this.$message.error('Загрузите картинку!')
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
    upload: function(data) {
      let file = data.file
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
