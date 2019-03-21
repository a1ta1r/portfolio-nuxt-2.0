<template>
  <el-card>
    <el-dialog :visible.sync="show_form">
      <add-banner-form
        :new-banner="newBanner"
        :show_dialog="show_form"/>
    </el-dialog>
    <el-table
      v-loading="processing"
      :data="advertisements"
      :default-sort="{prop: 'id', order: 'ascending'}"
      style="width: 100%"
      element-loading-text="Загрузка...">
      <el-table-column
        label="ID"
        prop="id"
        sortable/>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row>
            <el-col :span="6">
              <h2>Баннеры</h2>
            </el-col>
            <el-col
              :span="6"
              :offset="12">
              <el-button @click="add_banner(props.row)">Добавить баннер</el-button>
            </el-col>
          </el-row>
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
              rel="noopener noreferrer">ссылка на рекламу</a>
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
import AddBannerForm from './addBannerForm'
export default {
  name: 'AdvertisementsTable',
  components: { AddBannerForm },
  data() {
    return {
      show_form: false,
      newBanner: {}
    }
  },
  computed: {
    ...mapState('moderator', ['advertisements']),
    ...mapState('general', ['processing'])
  },
  methods: {
    add_banner: function(advertisement) {
      this.newBanner.advertisementId = advertisement.id
      this.show_form = !this.show_form
    }
  }
}
</script>

<style scoped>
.advertisement-card {
  margin-bottom: 8px;
}
</style>
