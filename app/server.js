const express = require('express')
var app = express()
/*
  Setup application
  1. Initialize logger
  2. Body and Cookie Parsing
  3. Initialize ElasticSearch Connection
  4. Serve Static Files
  5. Initialize socket connection
  success: Start Server
  failure: Log Error Message
 */

const bodyParser = require('body-parser')
const path = require('path')

// logging
const logger = require('./logger')
const env = process.env.NODE_ENV || 'development'
logger.level = env === 'development' ? 'debug' : 'info'

const morgan = require('morgan')
app.use(morgan('dev', { stream: logger.stream }))

// body and cookie parsing
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('cookie-parser')())

// Handle static files
app.use(express.static(path.join(__dirname, '..', 'client', 'public')))

// set up server
const PORT = process.env.PORT || 8080
app.set('port', PORT)
var server = require('http').Server(app)

// external routes
require('./auth').init(app)

// Socket.io Communication
var io = require('socket.io').listen(server)
var socketCookieParser = require('socket.io-cookie')
io.use(socketCookieParser)
require('./models/room').initializeSocket(io)

// start service
server.listen(PORT, () => {
    logger.info("Server started on port " + PORT)
})
