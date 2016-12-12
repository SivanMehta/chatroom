var express = require('express')
var app = express();
const path = require('path')

// logging
var morgan = require('morgan')
app.use(morgan('dev'))

// body and cookie parsing
app.use(require('body-parser').json())
var cookieParser = app.use(require('cookie-parser')())

// Handle static files
app.use(express.static(path.join(__dirname, 'client', 'public')))

// authentication handling
require('./app/auth').init(app)

const PORT = process.env.PORT || 8080
app.set('port', PORT)

var http = require('http').Server(app)
http.listen(PORT, () => {
    console.log("Server started on port " + PORT)
})
