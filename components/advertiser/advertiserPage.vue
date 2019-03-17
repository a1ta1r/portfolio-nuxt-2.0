<template>
  <el-card>
    <el-table
      v-loading="loading_show"
      :data="searchResult"
      :default-sort="{prop: 'id', order: 'ascending'}"
      :row-class-name="tableRowClassName"
      style="width: 100%"
      show-summary
      element-loading-text="Загрузка...">

      <el-table-column
        label="ID"
        prop="id"
        sortable/>
      <el-table-column type="expand">
        <template slot-scope="props">
          <pre>
                Успеем сегодня?
    Пересланные сообщения
    Никита
    Никита сегодня в 20:43
        А можем список разврнуть, как раньше в кабинете заказчика было?
    Чтобы у Коротун понимание сформировалось

Евгений Бурлаков
Евгений Бурлаков 23:20

    В списке будет реклама а если развернуть то там баннеры?

Никита Бакулин
Никита Бакулин 23:26

    Инфа о них
    Название - клики, просмотры
    Дата создания
          </pre>
        </template>
      </el-table-column>
      <el-table-column
        label="Название кек, кому оно нужно"
        prop="name"
        sortable/>
      <el-table-column
        label="Просомотры"
        prop="views"
        sortable/>
      <el-table-column
        label="Зачем мы тут (деньги)"
        prop="money"
        sortable/>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'AdvertiserPage',
  data() {
    return {
      value1: null
    }
  },
  computed: {
    searchResult: function() {
      let result = []
      for (let i = 0; i < 10; i++) {
        result.push({
          id: i,
          name: 'youmim',
          views: randomNumber(1, 100),
          money: randomNumber(0.1, 10)
        })
      }
      return result
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.views >= 50) {
        console.log(row.views)
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
</style>
