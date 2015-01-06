var OctoAppController = require('./octo-app.controller');

module.exports = function(app) {
  app.get('/', OctoAppController.index);
  
  app.get('/projects', OctoAppController.projects.index); //now an object
  app.get('/users',    OctoAppController.users.index);
  app.get('/invoices', OctoAppController.invoices.index);

  app.get('/invoices/new',      OctoAppController.invoices._new);
  app.post('/invoices/create',  OctoAppController.invoices.create);
  app.get('/invoices/:id',      OctoAppController.invoices.show);
  app.get('/invoices/:id/edit', OctoAppController.invoices.edit);
  app.post('/invoices/:id',     OctoAppController.invoices.update);
  app.del('/invoices/:id',      OctoAppController.invoices.destroy);
  

  app.get('/projects/new',      OctoAppController.projects._new);
  app.post('/projects/create',  OctoAppController.projects.create);
  app.get('/projects/:id',      OctoAppController.projects.show);
  app.get('/projects/:id/edit', OctoAppController.projects.edit);
  app.post('/projects/:id',     OctoAppController.projects.update);
  app.del('/projects/:id',      OctoAppController.projects.destroy); 

  app.get('/users/new',      OctoAppController.users._new);
  app.post('/users/create',  OctoAppController.users.create);
  app.get('/users/:id',      OctoAppController.users.show); // accessed by req.params.id in controller
  app.get('/users/:id/edit', OctoAppController.users.edit);
  app.post('/users/:id',     OctoAppController.users.update);
  // :id syntax will ONLY be found when defining routes. It is Express syntax!

}

