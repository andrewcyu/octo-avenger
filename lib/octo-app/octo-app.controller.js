

module.exports = {

  index : function(req,res) {
  	var siteData = {
  		data : {
  			hero : 'Octocat'
  		} };
    res.render('index', siteData);
  	
  }, 

  users : function(req, res) {
  	var usersData = {	
  			users : [
    			{name: 'Optimus', role: 'Admin'},
   				 {name: 'Septimus', role: 'User'},
 				]
  		}
    res.render('users', usersData);
  },

  projects : {

    index: function(req, res) {
  	 var projectsData = {
  		  projects : [
          {project: 'Octoavenger', owner: 'Andrew'},
          {project: 'Octocats', owner: 'Erich'},
          {project: 'Tutorials', owner: 'Octocatta'},
        ]};
      res.render('projects', projectsData);
    }, 
    _new: function(req, res) {
      res.render('projects/_new');
    },
    create: function(req, res) {
      console.log('[Form Contents]..');
      console.log(req.body.projectname);  
      console.log(req.body.projectowner);
      res.redirect('/projects');
    },
  },

  invoices : function(req, res) {
  	var invoicesData = {
  		invoices : [
  			{name: 'Andrew', hours: 5},
  			{name: 'Erich', hours: 7},
  			{name: 'Jason', hours: 6},
  			{name: 'Octocat', hours: 100},
  		] };
    res.render('invoices', invoicesData);
  }
};


