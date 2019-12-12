require('dotenv').config()

const cors = require('cors')
const routers = require('../router.js')
const express = require('express')
const morgan = require('morgan')

require('../database')

const app = express()
const server = require('http').Server(app)

app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.json())
app.use(routers)
app.use(morgan('dev'))

server.listen(process.env.PORT || 3333)
