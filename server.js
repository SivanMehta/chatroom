var express = require('express')
var app = express()
const bodyParser = require('body-parser')
const path = require('path')

// logging
var morgan = require('morgan')
app.use(morgan('dev'))

// body and cookie parsing
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var cookieParser = app.use(require('cookie-parser')())

// Handle static files
app.use(express.static(path.join(__dirname, 'client', 'public')))

const PORT = process.env.PORT || 8080
app.set('port', PORT)
var server = require('http').Server(app)

// external routes
require('./app/auth').init(app)

/* Socket.io Communication */
var io = require('socket.io').listen(server)
var socketCookieParser = require('socket.io-cookie')
io.use(socketCookieParser)
require('./app/rooms').initializeSocket(io)

server.listen(PORT, () => {
    console.log("Server started on port " + PORT)
})
