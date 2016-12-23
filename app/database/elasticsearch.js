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

exports.addDocument (document) => {
    return elasticClient.index({
        index: indexName,
        type: "document",
        body: {
            content: document.content,
            from: document.from,
            room: document.room,
            time: document.time,
            suggest: {
                input: document.content.split(" "),
                output: document.content
            }
        }
    });
}

exports.initMapping = () => {
    return client.indices.putMapping({
        index: indexName,
        type: "document",
        body: {
            properties: {
                content: { type: "string" },
                from: { type: "string" },
                room: { type: "string" },
                time: { type: "date" }
                suggest: {
                    type: "completion",
                    analyzer: "simple",
                    search_analyzer: "simple"
                }
            }
        }
    });
}
