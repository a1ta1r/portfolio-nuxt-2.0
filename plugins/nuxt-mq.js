import Vue from 'vue'
import NuxtMq from 'nuxt-mq'

Vue.use(NuxtMq, {
  breakpoints: {
    sm: 450,
    md: 1250,
    lg: Infinity
  },
  defaultBreakpoint: 'sm'
})
