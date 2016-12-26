const faker = require('faker')
const moment = require('moment')
const logger = require('../logger')
const es = require('../database/elasticsearch')

function initializeSocket(io) {
  io.on('connection', (socket) => {
    // at the point, users are connected
    logger.debug(socket.id, 'connected')
    socket.on('disconnect', () => {
      logger.debug(socket.id, 'disconnected')
    })

    socket.on('client:message', (data) => {
      const message  = {
        content: data.content,
        room: data.room,
        time: moment().toISOString(),
        from: socket.handshake.headers.cookie.email
      }
      es.addMessage(message)
      io.sockets.emit('server:message', message)
    })
  })
}

module.exports = {
  initializeSocket
}
