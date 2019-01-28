const express = require('express')
const consola = require('consola')
const dotenv = require('dotenv')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Preload config variables from env.config
dotenv.config({ path: 'env.config' })
const host = process.env.CREDIT_CLIENT_HOST || process.env.HOST || '0.0.0.0'
const port = process.env.CREDIT_CLIENT_PORT || process.env.PORT || 3000
const api =
  process.env.CREDIT_API_URL || 'https://loan-portfolio-api.herokuapp.com/'

app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')
config.axios.baseURL = api

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}, API url is ${api}`,
    badge: true
  })
}
start()
