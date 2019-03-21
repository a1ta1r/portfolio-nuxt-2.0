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
      imageLink:
        'https://www.pressfoto.ru/mediasample/s.pfst.net/2012.11/1656341880627316d171c8e1f98429118d40eba11c3_b.jpg?PressFoto_1656341.jpg',
      link: 'http://mobile-testing.ru/ne_stoit_brat_kredit/'
    }
  },
  computed: {
    ...mapState('client', ['banners'])
  },
  created: function() {
    this.$store.dispatch('client/rand_banner')
  },
  mounted() {
    /*const adv = this.banners.pop()
    this.imageLink = adv.pictureUrl
    this.link = adv.advertisementLink
    this.id = adv.id

    this.$store.dispatch('advertiser/view_banner', this.id)*/

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
      this.$store.dispatch('advertiser/click_banner', this.id)
      const win = window.open(this.link, '_blank')
      win.focus()
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
}
</style>
