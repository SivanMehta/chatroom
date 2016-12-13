// adapted from:
// http://lollyrock.com/articles/nodejs-encryption/

const crypto = require('crypto')
const algorithm = 'aes-256-ctr'
// This should be set in a carefully-protected environment variable,
// this is the kinda thing an idiot would have on his luggage
const password = '12345'

/**
 * Encrypt a String
 * @param  {String} text string to be encrypted with a predetermined password
 * @return {String} text encrypted string
 */
function encrypt(text) {
  var cipher = crypto.createCipher(algorithm, password)
  var encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

/**
 * decrypt a String
 * @param  {String} text encrypted string
 * @return {String} text string that was encrypted with a predetermined password
 */
function decrypt(text) {
  var decipher = crypto.createDecipher(algorithm, password)
  var deciphered = decipher.update(text, 'hex', 'utf8')
  deciphered += decipher.final('utf8');
  return deciphered;
}

module.exports = {
  encrypt,
  decrypt
}
