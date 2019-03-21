<template>
  <div
    :style="{ backgroundImage: 'url(' + imageLink + ')' }"
    @click="advertClick()"/>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AdvertBanner',
  data() {
    return {
      id: 4,
      imageLink: 'https://i.gyazo.com/8ec4bd5b062f367172767b9ee887f39e.jpg',
      link: ''
    }
  },
  computed: {
    ...mapState('client', ['banners'])
  },
  async mounted() {
    await this.$store.dispatch('client/rand_banner')
    this.load_adv()
  },
  methods: {
    load_adv() {
      const adv = this.banners.pop()
      this.imageLink = adv.pictureUrl
      this.link = adv.advertisementLink
      this.id = adv.id

      this.$store.dispatch('advertiser/view_banner', this.id)
    },
    advertClick() {
      if (this.link) {
        this.$store.dispatch('advertiser/click_banner', this.id)
        const win = window.open(this.link, '_blank')
        win.focus()
      }
    }
  }
}
</script>

<style scoped>
div {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 3px;
  cursor: pointer;
}
</style>
