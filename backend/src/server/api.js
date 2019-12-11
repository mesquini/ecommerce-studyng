const cors = require('cors')
const routers = require('../router.js')
const express = require('express')

require('../database')

const app = express()
const server = require('http').Server(app)

app.use(cors())
app.use(express.json())
app.use(routers)

server.listen(process.env.PORT || 3333)
