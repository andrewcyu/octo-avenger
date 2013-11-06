
/**
 * Module dependencies.
 *///setting up variables, including dependencies 
var express = require('express'),
    http = require('http'),
    path = require('path');

var app = express();

// App setup
// These are the configs
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*
  Include the subapps
  
  This allows us to mount subapplications
      - At specific URLS
      - Behind Authentication
      - Behind middleware
*/

app.use(require('./lib/octo-app')); // sub application are included 

// All routes in this subapp will be prepended with /api
app.use('/api',require('./lib/octo-api')); //oct-app + octo-api are express files 
// Everything is specificed within octo-api, so don't have to always do /api

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
