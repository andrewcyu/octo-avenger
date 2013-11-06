var OctoAppController = require('./octo-app.controller');

module.exports = function(app) {
  app.get('/', OctoAppController.index);
  
  app.get('/projects',  .projects.index); //now an object
  app.get('/users', OctoAppController.users);
  app.get('/invoices', OctoAppController.invoices);

  app.get('/projects/new', OctoAppController.projects._new);
  app.post('/projects/create', OctoAppController.projects.create);
}