const faker = require('faker')
const moment = require('moment')
const es = require('../database/elasticsearch')

exports.init = (app, done) => {
  app.io = require('socket.io').listen(app.server)

  app.io.on('connection', socket => {
    // at the point, users are connected
    app.logger.debug(socket.id, 'connected')
    socket.on('disconnect', () => {
      app.logger.debug(socket.id, 'disconnected')
    })
  })

  app.logger.info('Initialized socket connection')
  done()
}
