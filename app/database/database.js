const es = require('./elasticsearch')
const logger = require('../logger')

logger.level = 'debug'
es.client.ping({ requestTimeout: 30000, }, (error) => {
  if (error) {
    logger.error('elasticsearch cluster is down!')
  } else {
    logger.debug('elasticsearch cluster is up!')
  }
})

// start fresh elastic search index if one does not exist
es.indexExists().then(exists => {
  if(!exists) {
    logger.debug('creating messages index')
    return es.initIndex().then(es.initMapping)
  }
})
