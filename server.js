var express = require('express')
var app = express();
const path = require('path')

// logging
var morgan = require('morgan')
app.use(morgan('dev'))

// body parsing
app.use(require('body-parser').json())

// Handle static files
app.use(express.static(path.join(__dirname, 'client', 'public')))

// routing for now
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

const PORT = process.env.PORT || 8080
app.set('port', PORT)

var http = require('http').Server(app)
http.listen(PORT, () => {
    console.log("Server started on port " + PORT)
})
