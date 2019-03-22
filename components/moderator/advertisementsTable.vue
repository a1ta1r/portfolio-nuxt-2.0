<template>
  <el-card>
    <el-dialog :visible.sync="show_advertisement_form">
      <add-advertisement-form :show_dialog="show_advertisement_form"/>
    </el-dialog>
    <el-dialog :visible.sync="show_add_form">
      <add-banner-form
        :new-banner="newBanner"
        :show_dialog="show_add_form"
        @success="close_banner_form"/>
    </el-dialog>
    <el-dialog :visible.sync="show_edit_form">
      <edit-banner-form
        :new-banner="editableBanner"
        :show_dialog="show_edit_form"
        @success_edit="close_edit_banner_form"/>
    </el-dialog>
    <el-button @click="add_advertisements">Добавить рекламу</el-button>
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
            <el-button
              style="margin-left: 50px"
              size="mini"
              type="primary"
              @click="editBanner(item)">Изменить
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="removeBanner(item)">Удалить
            </el-button>
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
          <span v-if="scope.row.isActive"> Активно</span>
          <span v-else> Не активно</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { mapState } from 'vuex'
import AddBannerForm from './addBannerForm'
import EditBannerForm from './editBannerForm'
import AddAdvertisementForm from './addAdvertisementForm'

export default {
  name: 'AdvertisementsTable',
  components: { AddAdvertisementForm, AddBannerForm, EditBannerForm },
  data() {
    return {
      show_add_form: false,
      show_edit_form: false,
      show_advertisement_form: false,
      newBanner: {},
      editableBanner: {}
    }
  },
  computed: {
    ...mapState('moderator', ['advertisements', 'advertiser']),
    ...mapState('general', ['processing'])
  },
  methods: {
    add_banner: function(advertisement) {
      this.newBanner.advertisementId = advertisement.id
      this.show_add_form = !this.show_add_form
    },
    close_banner_form: function() {
      this.show_add_form = !this.show_add_form
    },
    removeBanner(item) {
      this.$store.dispatch('moderator/remove_banner', item).then(
        this.$notify.success({
          title: 'Баннер удалён',
          message: 'Вы удалили баннер'
        })
      )
    },
    editBanner(item) {
      this.editableBanner = item
      this.show_edit_form = !this.show_edit_form
    },
    close_edit_banner_form: function() {
      this.show_edit_form = !this.show_edit_form
    },
    add_advertisements() {
      this.show_advertisement_form = !this.show_advertisement_form
    }
  }
}
</script>

<style scoped>
.advertisement-card {
  margin-bottom: 8px;
}
</style>
