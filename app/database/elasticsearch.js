var elasticsearch = require('elasticsearch')
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: { levels: ['error', 'warning'] }
})

exports.client = client
const indexName = 'messages'

/**
* Delete an index
*/
exports.deleteIndex = () => {
  return client.indices.delete({ index: indexName })
}

/**
* create an index
*/
exports.initIndex = () => {
  return client.indices.create({ index: indexName })
}

/**
* check if an index exists
*/
exports.indexExists = () => {
  return client.indices.exists({ index: indexName })
}

exports.searchMessages = (query, callback) => {
  client.search({
    index: indexName,
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
    index: indexName,
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

exports.initMapping = () => {
  // logger.debug('initalizing mapping')
  return client.indices.putMapping({
    index: indexName,
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
