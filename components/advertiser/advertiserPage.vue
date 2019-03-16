<template>
  <el-row>
    <el-col :span="8"><p/></el-col>
    <el-col :span="8">
      <br>
      <br>
      <br>
      <br>
      <div class="block">
        <span class="demonstration">Оцените страницу</span>
        <el-rate v-model="value1"/>
      </div>
    </el-col>
    <el-col :span="8"><p/></el-col>
  </el-row>
</template>
<script>
export default {
  name: 'AdvertiserPage',
  data() {
    return {
      value1: null
    }
  }
}
</script>

<style scoped>
</style>
