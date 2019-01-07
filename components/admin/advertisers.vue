<template>
  <div>
    <div>
      <el-row 
        :gutter="20" 
        type="flex" 
        class="row-bg" 
        justify="space-between">
        <el-col>
          <div class="grid-content bg-purple">
            <el-input 
              v-model="searchQuery" 
              prefix-icon="el-icon-search" 
              type="text" 
              label="Поиск"
              placeholder="Поисковая строка"/>
          </div>
        </el-col>
        <el-col>
          <div class="grid-content bg-purple">
            <nuxt-link to="/secure/partner/new">
              <el-button class="el-icon-plus"> Добавить рекламодателя</el-button>
            </nuxt-link>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-table 
      v-loading="loading_show" 
      :data="searchResult" 
      :default-sort="{prop: 'id', order: 'ascending'}"
      element-loading-text="Загрузка...">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row 
            :gutter="20" 
            type="flex" 
            class="row-bg" 
            justify="space-between">
            <el-row :span="16">
              <h3>Реклама от {{ scope.row.username }}</h3>
            </el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <!--<el-button @click="dialogFormVisible = true" class="el-icon-plus"> Добавить рекламу</el-button>-->
                <el-dialog 
                  :visible.sync="dialogFormVisible" 
                  title="Добавить рекламу ух">
                  <el-form :model="promotion">
                    <el-form-item 
                      label="Название" 
                      prop="title">
                      <el-input v-model="promotion.title"/>
                    </el-form-item>
                    <el-form-item 
                      :label-width="formLabelWidth" 
                      label="Рекламодатель">
                      <el-input 
                        v-model="scope.row.username" 
                        disabled/>
                    </el-form-item>
                  </el-form>
                  <p>Всякие рекламкные баннеры мне кажется нужно вместе с рекламой добавлять пока не знаю</p>
                  <span 
                    slot="footer" 
                    class="dialog-footer">
                    <el-button @click="dialogFormVisible = false" >Не надо</el-button>
                    <el-button 
                      type="primary" 
                      @click="dialogFormVisible = false">Все равно не добавится пока никак ))</el-button>
                  </span>
                </el-dialog>
              </div>
            </el-col>
          </el-row>
          <el-table :data="advertiser_adv(scope)">
            <el-table-column 
              label="Идентификатор" 
              prop="id"/>
            <el-table-column 
              label="Создание" 
              prop="createdAt">
              <template slot-scope="scope">
                <span>{{ formatDate(scope) }}</span>
              </template>
            </el-table-column>
            <el-table-column 
              label="Состояние" 
              prop="IsActive">
              <template slot-scope="scope">
                <el-switch 
                  v-model="scope.row.isActive" 
                  active-color="#13ce66"/>
                <span v-if="scope.row.isActive"> Активна</span>
                <span v-else> Выключена</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>

      <el-table-column 
        label="Идентификатор" 
        prop="id" 
        sortable/>

      <el-table-column 
        label="Название" 
        prop="username" 
        sortable/>

      <el-table-column 
        label="Почта" 
        prop="email" 
        sortable/>
      <el-table-column 
        label="Регистрация" 
        prop="createdAt" 
        sortable>
        <template slot-scope="scope">
          <span>{{ formatDate(scope) }}</span>
        </template>
      </el-table-column>
      <el-table-column 
        label="Контакты" 
        prop="contactInfo" 
        sortable/>
      <el-table-column 
        label="Состояние" 
        prop="isActive" 
        sortable>
        <template slot-scope="scope">
          <el-switch 
            v-model="scope.row.isActive" 
            active-color="#13ce66" 
            @change="change_status(scope)"/>
          <span v-if="scope.row.isActive"> Активен</span>
          <span v-else> Выключен</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Операции">
        <template slot-scope="scope">
          <el-button-group>
            <el-button 
              size="small" 
              class="el-icon-message" 
              round 
              @click="send_mail(scope)"/>
            <el-button
              size="small"
              class="el-icon-edit"
              round 
              @click="$router.push({name: 'secure-partner-edit-id', params: { id:scope.row.id }})"/>
            <el-popover
              ref="popover"
              v-model="scope.row.show_del"
              trigger="click"
              placement="top">
              <p align="left">Удалить {{ scope.row.username }}?</p>
              <div style="text-align: center">
                <el-button 
                  size="mini" 
                  type="text" 
                  @click="scope.row.show_del = false">Не надо</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="delete_advertiser(scope)">Да
                </el-button>
              </div>
            </el-popover>
            <el-button 
              v-popover:popover 
              size="small" 
              plain 
              type="danger" 
              class="el-icon-delete" 
              round 
              @click="scope.row.show_del = true"/>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Advertisers',
  components: {},
  data() {
    return {
      dialogFormVisible: false,
      loading_show: true,
      searchQuery: '',
      prev: 0,
      next: 0,
      pager: 0,
      promotion: {
        title: ''
      }
    }
  },
  computed: {
    ...mapState(['advertisers', 'adv']),

    searchResult: function() {
      if (this.searchQuery === undefined || this.searchQuery === '') {
        return this.advertisers
      }
      return this.advertisers.filter(advertiser => {
        const preparedQuery = this.searchQuery.toLowerCase().trim()
        const preparedName = advertiser.username.toLowerCase().trim()
        return (
          preparedName.includes(preparedQuery) ||
          advertiser.id.toString().includes(preparedQuery)
        )
      })
    },

    pageResult: function() {
      return this.searchResult()
    }
  },
  mounted() {
    this.loading_show = true
    this.$store.dispatch('load_advertisers').then(() => {
      this.loading_show = false
    })
    this.$store.dispatch('load_adv')
  },
  methods: {
    change_status: function(el) {
      this.$store.dispatch(`update_advertiser_status`, el)
    },

    delete_advertiser: function(el) {
      this.$store.dispatch('delete_advertiser', el)
      this.advertisers.splice(this.advertisers.indexOf(el.row), 1)
      el.row.show_del = false
    },

    formatDate: function(value) {
      let a = new Date(value.row.createdAt)
      return a.toLocaleDateString('ru')
    },
    send_mail: function(value) {
      let email = value.row.email
      window.open(`mailto: ${email}`)
    },

    advertiser_adv: function(value) {
      return this.adv.filter(x => x.advertiserId === value.row.id)
    }
  }
}
</script>

<style>
</style>
