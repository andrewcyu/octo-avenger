var mongoose = require('mongoose');
var Project  = mongoose.model('Project');
var User     = mongoose.model('User');
var Invoice  = mongoose.model('Invoice');

module.exports = {

  index : function(req,res) {
  	var siteData = {
  		data : {
  			hero : 'Octocat'
  		} };
    res.render('index', siteData);
  	
  }, 

  users : {

    index : function(req, res) {
      User.find({}, function(err,doc){
        res.render('users/index', { 
        // doesnt matter what you call the key ('users' in this case), as long as its consistent with the view 
        users : doc 
        }); 
      });
    },

    _new: function(req, res) {
      var newUser = new User();
      res.render('users/_new', { 
        user : newUser,
        // we declare the 'action' variable here as this specific route. 
        action : '/users/create'
      });
    },    

    create: function(req, res) {
      var newUser = new User(req.body);
      newUser.save(function(err){
        res.redirect('/users');
      });
    },
    
    edit: function(req, res) {
      var userId = req.params.id;
      User.findById(userId, function(err,doc){
        res.render('users/_new', { 
          user : doc,
          action : '/users/' + userId
        });
      });
    },

    show: function(req, res) {
      // doc = what mongoose returns, so in this case, a single entry
      User.findById(req.params.id, function(err,doc){ 
        // links to the show page for each user 
        // user key matches up with 'user' in show.jade
        res.render('users/show', { user : doc }) 
      });
    },

    update: function(req, res) {
      // Defining what we need, so that we can... 
      var userId = req.params.id; 
      //...update this
      var updateUserValues = req.body;
      User.update( {_id : userId}, updateUserValues,  
        function(err){
        res.redirect('/users');
      });
    }
   
  },

  projects : {

    destroy: function(req, res) {
      var projectId = req.params.id;
      
      // _id is always available in mongo, .id is not stored in the db, a virtual. 
      // "virtuals" : an attribute that is not defined in the db
      // variety in 'id' in mongo is to avoid collisions 
      // projectId is what we pass through the url 
      
      Project.remove({_id : projectId}, function(err){
        // req.flash('info', 'Deleted successfully');
        res.redirect('/projects');
      });
    },    

    index: function(req, res) { 

  	  // This is grabbing the data from DB as an array (in docs), then redering to the projects/index view file 
      // {} empty object is what we're looking for, this will include everything, finds the data from mongoDB, and returns it to table on 'projects/index' page

  	  Project.find({}, function(err,docs){ // Read .find mongoose documentation 
        // 'projects' is the property, 'docs' is the value (an array)
        res.render('projects/index',{ projects : docs }); // 
      }); 
    }, 


    show: function(req, res) {
      
      // passing by the id of the object so that we can pull out the document of the object
      // we are looking for 'req.params.id'; grabs project ID in URL, grabs document with that ID from Mongo
      // declaring projectId as a variable to make sure intention is known
      
      var projectId = req.params.id;
      Project.findById(projectId, function(err,doc){
        res.render('projects/show', { project : doc });
      });
    },

    edit: function(req, res) {
      var projectId = req.params.id;
      Project.findById(projectId, function(err,doc){
        res.render('projects/_new', { 
          project : doc,
          // Adding 'action' variable, which will be called in the _new view from this controller
          // Concatenating to get the URL for the form
          action : '/projects/' + projectId
        });
      });
    },

    update: function(req, res) {
      var projectId = req.params.id; // What we need, so that we can... 
      var updateProjectValues = req.body;//...update this

      // 'Update' mongoose function  
      // (query, values you want to update, callback)
       
      // First param: a doc of what (documents) to update
      // "I want to update the document in Mongo so that _id = projectId"
      // Second param: a doc of what fields to update

      // Note: 
      // every object has an ID, which is why we can query for _id
      // but, we could also query for the keys we specified in the schema
      // E.g. { owner : "Jason"} or { name : "Octocat"}
      Project.update( {_id : projectId}, updateProjectValues,  
        function(err){
        res.redirect('/projects');
      });
    },

    _new: function(req, res) {
      // Instantiate an empty Project (which has 'name' and 'owner' properties) so that the _new.jade view, which has 'value' properties, will show
      // this is for because we have 'values' for the edit controller
      var newProject = new Project();
      res.render('projects/_new', { 
        // 'project' and 'action' variables, which will be called in the _new view   
        project : newProject,
        action : '/projects/create'
      });
    },

    create: function(req, res) {
      //console.log('[Form Contents]..'); 
      // Instead of logging, create new instance of project/user and then save
      // form = req.body, the inputs of the form, which we already took care of in _new.jade
      
      // all these var declarations are for intention!
      var newProjectValues = req.body;
      var newProject = new Project(newProjectValues);
      newProject.save(function(err){
        res.redirect('/projects'); //Saves what we input into req.body, redirects to overall projects page, shows newly inputted data 
      });
    },

  },
 
  invoices : {

    index : function(req, res) {
      Invoice.find({}, function(err,doc){
        res.render('invoices/index', {
          invoices : doc
        });
      });
    },

    _new : function(req, res){
      var newInvoice = new Invoice();
      res.render('invoices/_new', {
        invoice : newInvoice,
        action : '/invoices/create'
      });
    },

    create: function(req, res) {
      var newInvoiceValues = req.body;
      var newInvoice = new Invoice(newInvoiceValues);
      newInvoice.save(function(err){
        res.redirect('/invoices');
      });
    },

    destroy: function(req, res) {
      var InvoiceId = req.params.id;
      Invoice.remove({_id: InvoiceId}, function(err){
        res.redirect('/invoices');
      });
    },

    show: function(req, res) {
      var invoiceId = req.params.id;
      Invoice.findById(invoiceId, function(err, doc){
        res.render('invoices/show', { invoice : doc });
      });
    },

    edit: function(req, res) {
      var invoiceId = req.params.id;
      Invoice.findById(invoiceId, function(err, doc){
        res.render('invoices/_new', {
          invoice : doc,
          action : '/invoices/' + invoiceId
        });
      });
    },

    update: function(req, res) {
      var invoiceId = req.params.id;
      var updateInvoiceValues = req.body;
      Invoice.update( {_id : invoiceId}, updateInvoiceValues,
        function(err){
          res.redirect('/invoices');
      });
    },

  }
};

// comment