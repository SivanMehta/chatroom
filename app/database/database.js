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
    Array(Math.floor(Math.random() * 20) + 1).fill(1).map((e, i) => {
      return es.addMessage({
        content: faker.hacker.phrase(),
        room: rooms[i % 4],
        time: moment().toISOString(),
        from: faker.internet.email()
      })
    })
  })
