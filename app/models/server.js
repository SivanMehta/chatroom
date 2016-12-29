exports.init = (app, done) => {
  app.PORT = process.env.PORT || 8080
  app.set('port', app.PORT)
  app.server = require('http').Server(app)

  app.logger.info('Initialized server')
  done()
}
