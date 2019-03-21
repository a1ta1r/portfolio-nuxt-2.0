const express = require('express')
const consola = require('consola')
const dotenv = require('dotenv')
const multer = require('multer')
const bodyParser = require('body-parser')
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

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'static/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/upload', upload.array('file', 12), function(req, res) {
  res.send(JSON.stringify({ path: req.files[0].originalname }))
})

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
