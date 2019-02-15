<template>
  <el-container style="border: 1px solid #eee">
    <!--<el-aside width="200px">-->
    <!--<el-menu :router="true">-->
    <!--<el-menu-item index="/">-->
    <!--<span class="el-icon-d-arrow-left"> На главную</span>-->
    <!--</el-menu-item>-->
    <!--<el-menu-item index="/secure/profile">-->
    <!--<span class="el-icon-edit"> Профиль</span>-->
    <!--</el-menu-item>-->
    <!--<el-menu-item index="/">-->
    <!--<span> . . .</span>-->
    <!--</el-menu-item>-->
    <!--</el-menu>-->
    <!--</el-aside>-->

    <el-header>
      <el-menu
        mode="horizontal"
        default-active="admin">
        <el-menu-item
          index="admin">
          Коротун Василиса Павловна
        </el-menu-item>
        <el-menu-item
          :route="{ name: 'signIn' }"
          index="logOut"
          @click="log_out">
          Выход
        </el-menu-item>
      </el-menu>
    </el-header>

    <el-container>
      <el-main>
        <el-tabs
          v-model="activeName"
          type="border-card">
          <el-tab-pane name="advertisers"><span
            slot="label"
            class="el-icon-document"> Рекламодатели</span>
            <advertisers/>
          </el-tab-pane>
          <el-tab-pane name="finance"><span
            slot="label"
            class="el-icon-view"> Финансы</span><finance/></el-tab-pane>
          <el-tab-pane name="stats"><span
            slot="label"
            class="el-icon-star-on"> Статистика по пользователям</span><stats/></el-tab-pane>
          <el-tab-pane name="setting"><span
            slot="label"
            class="el-icon-setting"> Система</span>
            <system-activity/>
          </el-tab-pane>
        </el-tabs>
      </el-main>
      <el-footer/>
    </el-container>
  </el-container>
</template>

<script>
import advertisers from '../../components/admin/advertisers'
import Finance from '../../components/admin/finance'
import systemActivity from '../../components/admin/systemActivity'
import stats from '../../components/admin/stats'

export default {
  components: { Finance, advertisers, systemActivity, stats },
  data() {
    return {
      activeName: 'advertisers'
    }
  },
  mounted() {
    this.$store.dispatch('general/set_route', 'admin')
  },
  methods: {
    log_out: function() {
      this.$store.dispatch('client/log_out')
      this.$store.dispatch('general/set_authorized', false)
      this.$router.push({ name: 'signIn' })
    }
  }
}
</script>

<style>
</style>
