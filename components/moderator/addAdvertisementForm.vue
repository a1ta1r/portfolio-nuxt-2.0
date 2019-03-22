<template>
  <div>
    <h2>Добавить рекламу</h2>
    <el-form
      ref="addAdv"
      :model="newAdv">
      <el-form-item
        label="Название рекламы"
        prop="text">
        <el-input
          v-model="newAdv.title"
          clearable/>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('addAdv')">Добавить</el-button>
        <el-button @click="resetForm('addAdv')">Закрыть</el-button>
    </el-form-item></el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AddAdvertisementForm',
  props: {
    newAdv: {
      type: Object,
      default: () => {
        return {
          title: ''
        }
      }
    },
    show_dialog: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('moderator', ['advertiser'])
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.newAdv.advertiserId = this.advertiser.id
          this.newAdv.isActive = true
          this.$store.dispatch('moderator/add_advertisement', this.newAdv)
          this.show_dialog = false
          this.$emit('add_advertisements')
        }
      })
    },
    resetForm(formNAme) {
      this.show_dialog = false
      this.$emit('add_advertisements')
    }
  }
}
</script>

<style scoped>
</style>
