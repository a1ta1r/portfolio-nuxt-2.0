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
        <p>
          вот бы знать что тут должно быть ух заживем
        </p>
      </div>
    </el-col>
    <el-col :span="24">
      <el-carousel
        :interval="4000"
        type="card"
        height="600">
        <el-carousel-item
          v-for="item in 10"
          :key="item">
          <h3>{{ item }}</h3>
          <card>
            <h2 style="margin: 8px">
              а тут ваши баннеры можно листавть или нет, ячет не помню зачем этот рекламщик тут нужен. Просто статистику смотреть вроде или нет
            </h2>
            <button_group>
              <el-button
                type="primary"
                round>
                Good
              </el-button>
              <el-button
                type="danger"
                round>
                Not realy
            </el-button></button_group>
            <img
              src="http://placehold.it/800x170/777/fff"
              text="irst+Slide"
              alt="...">
            <button_group>
              <button>
                Good
              </button>
              <button>
                Not realy
              </button>
              <button>
                trash
              </button>
            </button_group>
          </card>
        </el-carousel-item>
      </el-carousel>
    </el-col>
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
.el-carousel__item {
  background-color: #99a9bf;
}
</style>
