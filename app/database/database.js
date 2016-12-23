const faker = require('faker')
const async = require('async')
const es = require('./elasticsearch')
const logger = require('../logger')

logger.level = 'debug'
es.client.ping({ requestTimeout: 30000, }, (error) => {
  if (error) {
    logger.error('elasticsearch cluster is down!')
  } else {
    logger.info('elasticsearch cluster is up!')
  }
})

// start fresh elastic search index if one does not exist
// and populate it with fake messages
es.indexExists()
  .then(exists => exists ? es.deleteIndex() : console.log('index does not exist'))
  .then(es.initIndex)
  .then(es.initMapping)

// es.deleteIndex()
