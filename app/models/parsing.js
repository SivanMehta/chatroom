const bodyParser = require('body-parser')

exports.init = (app, done) => {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(require('cookie-parser')())

  app.logger.info('Initialized body and cookie parsing')

  done()
}
