const pkg = require('./package')
const dotenv = require('dotenv')
dotenv.config({ path: 'env.config' })
const api =
  process.env.CREDIT_API_URL || 'https://loan-portfolio-api.herokuapp.com/'

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Кредитный портфель',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/Loan-Icon.png' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#409eff' },

  /*
  ** Global CSS
  */
  css: ['element-ui/lib/theme-chalk/index.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    { src: '@/plugins/vee-validate', ssr: false },
    { src: '@/plugins/vue-full-calendar', ssr: false }
    // './plugins/vue-numeric'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    ['@nuxtjs/moment', ['ru']],
    [
      'nuxt-mq',
      {
        // Default breakpoint for SSR
        breakpoints: {
          sm: 550,
          smd: 1000,
          md: 1250,
          lg: Infinity
        },
        defaultBreakpoint: {
          sm: 550,
          md: 1250,
          lg: Infinity
        }
      }
    ]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: api
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
