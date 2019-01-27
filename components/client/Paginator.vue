<template>
  <div class="form-group">
    <button
      :value="value.page"
      class="btn btn-outline-primary"
      @click="prevPage">Назад</button>
    <label>{{ currentPage }} из {{ pages }}</label>
    <button
      :value="value.page"
      class="btn btn-outline-primary"
      @click="nextPage">Вперед</button>
  </div>
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
