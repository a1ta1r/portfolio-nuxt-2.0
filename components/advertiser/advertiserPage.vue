<template>
  <el-card>
    <el-table
      v-loading="loading_show"
      :data="searchResult"
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
          <el-row :gutter="8">
            <el-col
              v-for="item in props.row.banners"
              :xs="24"
              :sm="22"
              :md="10"
              :lg="8"
              :xl="6"
              :key="item.id">
              <el-card class="advertisement-card">
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
                  rel="noopener noreferrer">ссылка на рекламу</a>
              </el-card>
            </el-col>
          </el-row>
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
          <span v-if="scope.row.isActive"> Активно</span>
          <span v-else> Не активно</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AdvertiserPage',
  data() {
    return {
      value1: null
    }
  },
  computed: {
    ...mapState('advertiser', ['banners', 'advertisements', 'id']),
    searchResult: function() {
      // TODO search in advertisements and banners here
      return this.advertisements
    }
  },
  watch: {
    id: function() {
      this.fetch_data()
    }
  },
  mounted() {
    this.fetch_data()
  },
  methods: {
    fetch_data() {
      this.$store
        .dispatch('advertiser/load_advertisements', this.id)
        .then(result => {
          this.advertisements.forEach(x => {
            this.$store.dispatch('advertiser/load_banners', x.id)
          })
        })
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.views >= 50) {
        return 'success-row'
      } else return ''
    }
  }
}
function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}
</script>


<style scoped>
.el-carousel__item {
  background-color: #99a9bf;
}
.el-table .el-table__body tr.success-row td {
  background-color: #72f952;
}
.banner-image {
  width: 300px;
}
.advertisement-card {
  margin-bottom: 8px;
}
</style>
