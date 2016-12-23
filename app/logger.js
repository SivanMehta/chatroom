const winston = require('winston')
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'reference-project.log' })
  ]
})

logger.stream = {
    write: (message, encoding) => {
        logger.debug(message)
    }
}

module.exports = logger
