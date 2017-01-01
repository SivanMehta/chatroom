const morgan = require('morgan')
const winston = require('winston')
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)()
    // ,new (winston.transports.File)({ filename: 'reference-project.log' })
  ]
})

logger.stream = {
    write: (message, encoding) => {
        logger.info(message.split('\n')[0])
    }
}

exports.init = (app, done) => {
  app.logger = logger
  app.env = process.env.NODE_ENV || 'development'
  logger.level = app.env === 'development' ? 'debug' : 'info'
  app.use(morgan('dev', { stream: logger.stream }))

  app.logger.info('Initialized logger')

  done(null)
}
