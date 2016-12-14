const moment = require('moment')

exports.init = (io) => {
  io.on('connection', (socket) => {
    // at the point, users are connected
    console.log(socket.id, 'connected')
    socket.on('disconnect', () => {
      console.log(socket.id, 'disconnected')
    })

    socket.on('client:message', (data) => {
      const message  = {
        content: data.content,
        room: data.room,
        time: moment()
      }
      console.log(message)
      io.sockets.emit('server:message', message)
    })
  })
}
