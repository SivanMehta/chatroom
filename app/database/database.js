const faker = require('faker')
const async = require('async')
const es = require('./elasticsearch')
const moment = require('moment')
const logger = require('../logger')

es.client.ping({ requestTimeout: 30000, }, (error) => {
  if (error) {
    logger.error('elasticsearch cluster is down!')
  } else {
    logger.info('elasticsearch cluster is up!')
  }
})

// start fresh elastic search index if one does not exist
// and populate it with fake messages
const rooms = ['John', 'Paul', 'George', 'Ringo']
es.indexExists()
  .then(exists => exists ? es.deleteIndex() : console.log('index does not exist'))
  .then(es.initIndex)
  .then(es.initMapping)
  .then(() => {
    logger.debug('populating index')
    Array(11).fill(1).map((e, i) => {
      return es.addMessage({
        content: faker.hacker.phrase(),
        room: rooms[i % 4],
        time: moment().toISOString(),
        from: faker.internet.email()
      })
    })
  })

exports.searchMessages = (req, res) => {
  if(!req.query.q) {
    res.send([])
  } else {
    es.searchMessages(req.query.q, (err, response) => {
      if(err) {
        logger.error(err)
      } else {
        res.send(response.hits.hits)
      }
    })
  }
}

exports.getRoomMessages = (req, res) => {
  es.getRoomMessages(req.params.roomID, (err, response) => {
    if(err) {
      logger.error(err)
    } else {
      res.send(response.hits.hits.map(message => {
        return {
          content: message._source.content,
          from: message._source.from,
          room: message._source.room,
          time: message._source.time
        }
      }))
    }
  })
}
