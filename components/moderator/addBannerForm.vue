<template>
  <div>
    <el-form>
      <el-upload
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :limit="1"
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
          class="el-upload__tip">Изображения, размером менее 5 МБ</div>
      </el-upload>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button @click="show_dialog = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="show_dialog = false">Confirm</el-button>
      </span>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AddBannerForm',
  props: {
    newBanner: {
      type: Object,
      default: () => {
        return {}
      }
    },
    show_dialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    upload: function(data) {
      let file = data.file
    }
  }
}
</script>

<style scoped>
</style>
