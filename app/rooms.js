const wisdom = require('bob-ross-lipsum')

/**
 * Fetches the messages associated with a room.
 * For now we're just generating random messages until
 * we can pull from a data store
 */
function getRoomMessages(req, res) {
  var messages = []
  for(var i = 0; i < Math.floor(Math.random() * 10) + 1; i ++) {
    messages.push(wisdom())
  }
  res.send({messages: messages})
}

module.exports = {
  getRoomMessages
}
