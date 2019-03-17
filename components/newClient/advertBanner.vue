<template>
  <div
    :style="{ backgroundImage: 'url(' + link + ')' }"
    @click="advertClick()"/>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AdvertBanner',
  props: {
    id: {
      type: Number,
      default: 2
    },
    link: {
      type: String,
      default:
        'https://www.pressfoto.ru/mediasample/s.pfst.net/2012.11/1656341880627316d171c8e1f98429118d40eba11c3_b.jpg?PressFoto_1656341.jpg'
    }
  },
  computed: {
    ...mapActions('client', ['rand_banner'])
  },
  created: function() {
    //this.rand_banner()
    console.dir('Created!')
  },
  methods: {
    advertClick() {
      console.dir('Component click!')
    }
  }
}
</script>

<style scoped>
div {
  height: 100%;
  width: 100%;
}
</style>
