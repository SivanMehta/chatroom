const async = require('async')
const express = require('express')
var app = express()

// Instantiate intializers of the application
const intializers = [
  // 1. Initialize logger
  './models/logger',
  // 2. Body and Cookie Parsing
  './models/parsing',
  // 3. Initialize database
  './database/database',
  // 4. Serve Static Files
  './models/static-files',
  // 5. Initialize server
  './models/server',
  // 5. Initialize socket connection
  './models/room-socket',
  // 6. Initilize all of the routes
  './routes'
].map(filename => {
  return (done) => { require(filename).init(app, done) }
})

// activate all intializers
async.waterfall(intializers, (err, _) => {
  // success: Start server
  // failure: Log error Message
  if(err) {
    app.logger.error(error)
  } else {
    app.server.listen(app.PORT, () => {
        app.logger.info("Server started on port " + app.PORT)
    })
  }
})
