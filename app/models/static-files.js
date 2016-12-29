const path = require('path')
const express = require('express')

exports.init = (app, done) => {
  app.use(express.static(path.join(__dirname, '..', '..', 'client', 'public')))

  app.logger.info('Initialized static file server')
  done()
}
