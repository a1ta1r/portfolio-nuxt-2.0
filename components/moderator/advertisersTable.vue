<template>
  <div>
    <el-card
      v-for="item in advertisers"
      :key="item.id"
      class="advertiser-card"
      shadow="hover">
      <div @click="card_click(item.id)">
        <h2>{{ item.username }}</h2>
        <p>ID: {{ item.id }} </p>
        <p>Email: {{ item.email }}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AdvertisersTable',
  computed: {
    ...mapState('moderator', ['advertisers'])
  },
  mounted() {
    this.$store.dispatch('moderator/load_advertisers')
  },
  methods: {
    card_click: function(id) {
      this.$store.dispatch('moderator/load_advertisements', id)
    }
  }
}
</script>

<style scoped>
.advertiser-card {
  margin-bottom: 8px;
  cursor: pointer;
}
</style>
