'use strict';

const CONSTANTS = {
  APP_PORT: 3001,
  NOT_FOUND_CODE: 404
};
const express = require('express');
const fs = require('fs');
const app = express();
const logger = require('morgan');

app.use(logger('dev'));

app.use('/css', express.static('dist/css'));
app.use('/img', express.static('src/img'));
app.use('/js', express.static('dist/js'));
app.use('/snippets', express.static('snippets'));
app.use('/tmpl', express.static(__dirname + '/html'));
app.set('views', __dirname + '/html');
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

app.get('/language/:id', function(req, res) {
  let fileName = 'snippets/' + req.url.replace('/language/', '') + '.json';
  res.send(JSON.parse(fs.readFileSync(fileName)));
});

app.get('/langs', function(req, res) {
  let list = fs.readdirSync('snippets').map(function(lang) {
    return JSON.parse(fs.readFileSync('snippets/' + lang));
  });

  res.send(list);
});

app.get('/', function(req, res) {
  if(req.url === '/') {
    res.render('main');
  } else {
    res.status(CONSTANTS.NOT_FOUND_CODE).send(req.url + ' not found!!!');
  }
});

app.listen(CONSTANTS.APP_PORT, function() {
  console.log('App ready in port', CONSTANTS.APP_PORT);
});

module.exports = app;