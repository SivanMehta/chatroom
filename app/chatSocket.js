module.exports = (socket) => {
    // at the point, users are connected
    console.log(socket.id, 'connected')
    socket.on('disconnect', () => {
      console.log(socket.id, 'disconnected')
    })
}
