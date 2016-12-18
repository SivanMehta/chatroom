const express = require('express')
var app = express()
const bodyParser = require('body-parser')
const path = require('path')

// logging
const morgan = require('morgan')
app.use(morgan('dev'))

// body and cookie parsing
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require('cookie-parser')())

// Handle static files
app.use(express.static(path.join(__dirname, '..', 'client', 'public')))

// logging
const logger = require('./logger')
const env = process.env.NODE_ENV || 'development'
logger.level = env === 'development' ? 'debug' : 'info'

const PORT = process.env.PORT || 8080
app.set('port', PORT)
var server = require('http').Server(app)

// external routes
require('./auth').init(app)

/* Socket.io Communication */
var io = require('socket.io').listen(server)
var socketCookieParser = require('socket.io-cookie')
io.use(socketCookieParser)
require('./rooms').initializeSocket(io)

server.listen(PORT, () => {
    logger.info("Server started on port " + PORT)
})
