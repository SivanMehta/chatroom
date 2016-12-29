const faker = require('faker')
const moment = require('moment')
const es = require('../database/elasticsearch')
const socketCookieParser = require('socket.io-cookie')

exports.init = (app, done) => {
  app.io = require('socket.io').listen(app.server)
  app.io.use(socketCookieParser)

  app.io.on('connection', (socket) => {
    // at the point, users are connected
    app.logger.debug(socket.id, 'connected')
    socket.on('disconnect', () => {
      app.logger.debug(socket.id, 'disconnected')
    })

    socket.on('client:message', (data) => {
      const message  = {
        content: data.content,
        room: data.room,
        time: moment().toISOString(),
        from: socket.handshake.headers.cookie.email
      }
      es.addMessage(app, message)
      app.io.sockets.emit('server:message', message)
    })
  })

  app.logger.info('Initialized socket connection')
  done()
}
