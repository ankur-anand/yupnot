const prod = require('./prod');

if (process.env.NODE_ENV === 'production') {
  module.exports = prod;
} else {
  /* eslint-disable no-alert, global-require */
  module.exports = require('./dev');
}
