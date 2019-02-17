<template>
  <el-table :data="gridData">
    <el-table-column
      prop="dates"
      label="Есть и другие даты в этом месяце">
      <template slot-scope="scope">
        {{ dateFormatter(scope.row) }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'LittleDatesTable',
  props: {
    gridData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    dateFormatter(value) {
      return value.toDate().toLocaleDateString('ru')
    }
  }
}
</script>

<style scoped>
</style>
