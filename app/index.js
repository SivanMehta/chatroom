const async = require('async')
const express = require('express')
var app = express()

// Instantiate intializers of the application
const intializers = [
  // Initialize logger
  './models/logger',
  // Initialize server and socket connection
  './models/server',
  // Body and Cookie Parsing
  './models/parsing',
  // Initialize database
  './database/database',
  // Serve Static Files
  './models/static-files',
  // Initilize all of the routes
  './routes'
].map(filename => done => require(filename).init(app, done) )

// activate all intializers
async.waterfall(intializers, (err, _) => {
  // success: Start server
  // failure: Log error Message
  if(err) {
    app.logger.error(err)
  } else {
    app.server.listen(app.PORT, () => {
        app.logger.info("Server started on port " + app.PORT)
    })
  }
})
