exports.init = (app, done) => {
  app.PORT = process.env.PORT || 8080
  app.set('port', app.PORT)
  app.server = require('http').Server(app)
  app.logger.info('Initialized server')

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
