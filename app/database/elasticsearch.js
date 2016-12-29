var elasticsearch = require('elasticsearch')
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: { levels: ['error', 'warning'] }
})

exports.client = client

/**
* Delete an index
*/
exports.deleteMessageIndex = () => {
  return client.indices.delete({ index: 'messages' })
}

/**
* create an index
*/
exports.initMessageIndex = () => {
  return client.indices.create({ index: 'messages' })
}

/**
* check if an index exists
*/
exports.messageIndexExists = () => {
  return client.indices.exists({ index: 'messages' })
}

exports.searchMessages = (query, callback) => {
  client.search({
    index: 'message',
    q: 'content:*' + query + "*"
  }, callback)
}

exports.getRoomMessages = (room, callback) => {
  client.search({
    body: {
      query: {
        match: { room: room }
      },
      sort: {
        time: { order: 'asc' }
      }
    },
    size: 20
  }, callback)
}

exports.addMessage = (app, message) => {
  client.create({
    index: 'messages',
    type: "message",
    id: message.room + message.time,
    body: {
      content: message.content,
      from: message.from,
      room: message.room,
      time: message.time,
      suggest: {
        input: message.content.split(" ")
      }
    }
  }, (err, response) => {
    if(err) {
      app.logger.error(err)
    }
  })
}

exports.initMessageMapping = () => {
  return client.indices.putMapping({
    index: 'messages',
    type: "message",
    body: {
      properties: {
        content: { type: "string" },
        from: { type: "string" },
        room: { type: "string" },
        time: { type: "date" },
        suggest: {
          type: "completion",
          analyzer: "simple",
          search_analyzer: "simple"
        }
      }
    }
  })
}
