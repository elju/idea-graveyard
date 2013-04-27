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

var portz = (process.env.OPENSHIFT_INTERNAL_PORT || process.env.PORT);
var dirz = (process.env.OPENSHIFT_REPO_DIR || __dirname);

app.set('port', portz || 8080);
app.set('views', dirz + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
  app.use(require('less-middleware')({ src: process.env.OPENSHIFT_REPO_DIR + '/public' }));
app.use(express.static(dirz + '/public'));
console.log(dirz);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.listen(app.get('port'), (process.env.OPENSHIFT_INTERNAL_IP || '127.0.0.1'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
