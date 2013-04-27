#!/bin/env node
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.OPENSHIFT_INTERNAL_PORT || 8080);
app.set('views', process.env.OPENSHIFT_REPO_DIR + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
  app.use(require('less-middleware')({ src: process.env.OPENSHIFT_REPO_DIR + '/public' }));
app.use(express.static(process.env.OPENSHIFT_REPO_DIR + '/public'));
console.log(process.env.OPENSHIFT_REPO_DIR);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.listen(app.get('port'), process.env.OPENSHIFT_INTERNAL_IP, function(){
  console.log('Express server listening on port ' + app.get('port'));
});
