const faker = require('faker')
const async = require('async')
const es = require('./elasticsearch')
const moment = require('moment')

exports.init = (app, done) => {

  function pingClient(app, callback) {
    es.client.ping({ requestTimeout: 30000, }, (error) => {
      if (error) {
        app.logger.error('ElasticSearch cluster is down!')
        done(error)
      } else {
        app.logger.info('ElasticSearch cluster is up!')
        callback()
      }
    })
  }

  function initializeIndex(app, callback) {
    // start fresh elastic search index if one does not exist
    // and populate it with fake messages
    app.logger.info('Initializing ElasticSearch index')
    const rooms = ['John', 'Paul', 'George', 'Ringo']
    es.messageIndexExists()
      .then(exists => exists ? es.deleteMessageIndex() : app.logger.error('ElasticSearch Index does not exist'))
      .then(es.initMessageIndex)
      .then(es.initMessageMapping)
      .then(() => {
        app.logger.info('Populating index')
        Array(41).fill(1).map((e, i) => {
          return es.addMessage(app, {
            content: faker.hacker.phrase(),
            room: rooms[i % 4],
            time: moment().subtract(i, 'hours').toISOString(),
            from: faker.internet.email()
          })
        })
      })
      .then(callback)
  }

  function searchMessages(req, res) {
    if(!req.query.q) {
      res.send([])
    } else {
      es.searchMessages(req.query.q, (err, response) => {
        if(err) {
          app.logger.error(err)
        } else {
          res.send(response.hits.hits.map(message => {
            return {
              content: message._source.content,
              from: message._source.from,
              room: message._source.room,
              time: moment(message._source.time).format("h:mma MMM Do")
            }
          }))
        }
      })
    }
  }

  function getRoomMessages(req, res) {
    es.getRoomMessages(req.params.roomID, (err, response) => {
      if(err) {
        logger.error(err)
      } else {
        res.send(response.hits.hits.map(message => {
          return {
            content: message._source.content,
            from: message._source.from,
            room: message._source.room,
            time: moment(message._source.time).format("h:mma MMM Do")
          }
        }))
      }
    })
  }

  function receiveMessage(req, res) {
    var data = req.body
    const message  = {
      content: data.content,
      room: data.room,
      time: moment().toISOString(),
      from: req.cookies.email
    }
    es.addMessage(app, message)
    message.time = moment(message.time).format("h:mma MMM Do")
    app.io.sockets.emit('server:message', message)
    res.sendStatus(200)
  }

  async.waterfall([
    (callback) => { pingClient(app, callback) },
    (callback) => { initializeIndex(app, callback) }
  ], (err, _) => {
    if(err) {
      done(err)
    } else {
      app.db = {
        searchMessages,
        getRoomMessages,
        receiveMessage
      }
      done(null)
    }
  })
}
