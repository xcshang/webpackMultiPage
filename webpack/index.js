switch (process.env.NODE_ENV) {
  case 'production':
    module.exports = require('./_prod.js')
    break
  case 'api':
  case 'development':
    module.exports = require('./_dev.js')
    break
  case 'buildTest':
    module.exports = require('./_buildTest.js')
    break
  default:
    break
}
