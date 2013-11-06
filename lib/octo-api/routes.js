var OctoApiController = require('./octo-api.controller');

module.exports = function(app) {
  app.get('/', OctoApiController.index);
}