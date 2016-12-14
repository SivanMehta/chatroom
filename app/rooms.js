const wisdom = require('bob-ross-lipsum')
const moment = require('moment')

// this should be a database, but for now we'll do
// persistence in-memory
var messages = {}
const rooms = ['John', 'Paul', 'George', 'Ringo']
rooms.forEach(room => {
  messages[room] = []
  for(var i = 0; i < Math.floor(Math.random() * 10) + 1; i ++) {
    const message  = {
      content: wisdom(),
      room: room,
      time: moment()
    }
    messages[room].push(message)
  }
})

/**
 * Fetches the messages associated with a room.
 * For now we're just generating random messages until
 * we can pull from a data store
 */
function getRoomMessages(req, res) {
  res.send({messages: messages[req.params.roomId]})
}

function initializeSocket(io) {
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
        time: moment(),
        from: socket.handshake.headers.cookie.email
      }
      messages[data.room].push(message)
      io.sockets.emit('server:message')
    })
  })
}

module.exports = {
  getRoomMessages,
  initializeSocket
}
