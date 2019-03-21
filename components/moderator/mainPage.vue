<template>
  <div>
    <h2>Вы модератор ха</h2>
    <el-container class="aside">
      <el-aside>
        <advertisers-table/>
      </el-aside>
      <el-container>
        <el-main>
          <advertisements-table/>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import AdvertisersTable from './advertisersTable'
import AdvertisementsTable from './advertisementsTable'
export default {
  name: 'MainPage',
  components: { AdvertisementsTable, AdvertisersTable }
}
</script>

<style scoped>
.aside {
  height: 100vh;
}
</style>
