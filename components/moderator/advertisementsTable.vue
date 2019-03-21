<template>
  <el-card>
    <el-table
      v-loading="processing"
      :data="advertisements"
      :default-sort="{prop: 'id', order: 'ascending'}"
      :row-class-name="tableRowClassName"
      style="width: 100%"
      element-loading-text="Загрузка...">
      <el-table-column
        label="ID"
        prop="id"
        sortable/>
      <el-table-column type="expand">
        <template slot-scope="props">
          <h2>Баннеры</h2>
          <el-card
            v-for="item in props.row.banners"
            :key="item.id"
            class="advertisement-card">
            <p>Название: {{ item.text }}</p>
            <img
              :src="item.pictureUrl"
              alt="text"
              class="banner-image">
            <p>Создан: {{ new Date(item.createdAt).toLocaleDateString('ru') }}</p>
            <p>Кликов: {{ item.clicks }}</p>
            <p>Просмотров: {{ item.views }}</p>
            <a
              :href="item.advertisementLink"
              target="_blank"
              rel="noopener noreferrer">ссылка на рекламу?</a>
          </el-card>
        </template>
      </el-table-column>
      <el-table-column
        label="Название"
        prop="title"
        sortable/>
      <el-table-column
        label="Активно"
        prop="isActive"
        sortable>
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isActive"
            active-color="#13ce66"/>
          <span v-if="scope.row.isActive"> Активено</span>
          <span v-else> Не активно</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AdvertisementsTable',
  computed: {
    ...mapState('moderator', ['advertisements']),
    ...mapState('general', ['processing'])
  }
}
</script>

<style scoped>
.advertisement-card {
  margin-bottom: 8px;
}
</style>
