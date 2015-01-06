/**
 * Module dependencies.
 *///setting up variables, including dependencies 
var express = require('express'),
    http    = require('http'),
    path    = require('path');
    fs      = require('fs'),
    nconf   = require('nconf');

var app = express();

// Mongoose stuff 
var mongoose = require('mongoose');

// setup nconf to use (in order) env variables, a file located at '/config.json'
// nconf is reading from these sources - the environment variables (in the bash profile) (env()), and the config file 
nconf.env()
     .file({ file: 'config.json'});

// this will get the DB_URL property, to pass to mongoose
// nconf.get("DB_URL")

// we pass the URL (which is a string) to the 'connect' function, which creates a connection between the db and the url
mongoose.connect(nconf.get("DB_URL")); // was previously 'mongodb://localhost/test'

/**********************
 * SCHEMA DEFINITIONS *
 **********************/

// Define the schema of our projects
// Schema is a way to declare intention so that mongoose knows what to expect
var projectsSchema = mongoose.Schema({
      owner   : String,
      name    : String,
      created : { type: Date, default: Date.now }
    });

// Compiling schema into a model
var Project = mongoose.model('Project', projectsSchema);

// Define the schema of our users 
var usersSchema = mongoose.Schema({
  name : String,
  role : String,
  created : { type: Date, default: Date.now }
});

var User = mongoose.model('User', usersSchema);

// Define the schema of invoices
var invoicesSchema = mongoose.Schema({
  name    : String,
  hours   : String,
  created : { type: Date, default: Date.now}
});
//Compiling schema into a model
var Invoice = mongoose.model('Invoice', invoicesSchema);

var db = mongoose.connection;

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

/*****************
 * Sub App & API *
 *****************/

/*
  Include the subapps
  
  This allows us to mount subapplications
      - At specific URLS
      - Behind Authentication
      - Behind middleware
*/

app.use(require('./lib/octo-app')); // sub application are included 

/*

All routes in this subapp will be prepended with /api
oct-app + octo-api are express files 
Everything is specificed within octo-api, so don't have to always do /api 

*/

app.use('/api',require('./lib/octo-api')); 

/**** LISTEN! *****/

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

