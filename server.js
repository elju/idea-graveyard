#!/bin/env node
/**
 * Module dependencies.
 */

var express = require('express')
  , exec = require('child_process').exec
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , GithubAPI = require('github');

var app = express();

var ls = exec('ls -la', function(err, stdout, stderr) {
    console.log('Results from the ls: ' + stdout);
    if (err) console.log('There was en error ' + err);
});

var listRepoNames = function listRepoNames (arr) {
    arr.forEach(function(elt, i) {
        console.log('Repo ' + i + ': ' + elt.name);
    });
};

var github = new GithubAPI({
    version: "3.0.0",
    timeout: 5000
});
github.authenticate({
    type: "oauth",
    token: "843fcb5c469b46a4f8e0c51ce32935e0db3e3a0b"
});
github.repos.getAll({}, function(err, res) {
    console.log("Here's the response! :");
    listRepoNames(res);
});



// all environments

var portz = (process.env.OPENSHIFT_INTERNAL_PORT || process.env.PORT);
var dirz = (process.env.OPENSHIFT_REPO_DIR || __dirname);

app.set('port', portz || 3000);
app.set('views', dirz + '/views');
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: (process.env.OPENSHIFT_REPO_DIR || '.') + '/public' }));
app.use(express.static(dirz + '/public'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.listen(app.get('port'), (process.env.OPENSHIFT_INTERNAL_IP || '127.0.0.1'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
