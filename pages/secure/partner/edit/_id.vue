<template>
  <FormEditAdvertiser :advertiser="singleAdvertiser"/>
</template>

<script>
import FormEditAdvertiser from '../../../../components/admin/formEditAdvertiser'
import { mapState } from 'vuex'
export default {
  components: {
    FormEditAdvertiser
  },
  computed: {
    ...mapState('admin', ['singleAdvertiser'])
  },
  // mounted() {
  //   this.$store.dispatch('get_advertiser', this.$route.params.id)
  // },
  async fetch({ store, params }) {
    await store.dispatch('admin/get_advertiser', params.id)
  }
}
</script>
