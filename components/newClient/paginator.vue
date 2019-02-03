<template>
  <el-row>
    <el-col :span="6"><p/></el-col>
    <el-col :span="18">
      <el-button
        type="primary"
        @click="prevPage">Назад</el-button>
      <label>{{ currentPage }} из {{ pages }}</label>
      <el-button
        type="primary"
        @click="nextPage">Вперед</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Paginator',
  props: {
    limit: {
      type: Number,
      default: 12
    },
    value: {
      type: Object,
      default: function() {
        return {
          offset: 0,
          limit: 12
        }
      }
    },
    length: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      offset: 0
    }
  },
  computed: {
    pages: function() {
      return Math.ceil(this.length / this.limit)
    },
    currentPage: function() {
      return this.value.offset / this.limit + 1
    }
  },
  methods: {
    nextPage: function() {
      let newOffset = this.value.offset + this.limit
      if (newOffset < this.length) {
        this.value.offset = newOffset
      }
      this.emitChange()
    },
    prevPage: function() {
      let newOffset = this.value.offset - this.limit
      if (newOffset >= 0) {
        this.value.offset = newOffset
      }
      this.emitChange()
    },
    emitChange: function() {
      this.$emit('input', {
        page: this.currentPage,
        limit: 12,
        offset: this.value.offset
      })
    }
  }
}
</script>

<style scoped>
</style>
