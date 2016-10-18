'use strict';

//Plugins
const CONSTANTS = {
  APP_PORT: 3001,
  NOT_FOUND_CODE: 404
};
const express = require('express');
const fs = require('fs');
const app = express();
const logger = require('morgan');

//Utils
let getSingleLangSnippets = (file) => JSON.parse(fs.readFileSync('snippets/' + file));

//Static files
app.use(logger('dev'));
app.use('/css', express.static('dist/css'));
app.use('/img', express.static('src/img'));
app.use('/js', express.static('dist/js'));
app.use('/tmpl', express.static(__dirname + '/html'));
app.set('views', __dirname + '/html');
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

//Routes
app.get('/language/:lang', (req, res) => res.send(getSingleLangSnippets(req.params.lang + '.json')));
app.get('/langs', (req, res) => res.send(fs.readdirSync('snippets').map(getSingleLangSnippets)));
app.get('/', (req, res) => res.render('main'));

//Page not found error
app.get('*', (req, res) => res.status(CONSTANTS.NOT_FOUND_CODE).send(req.url + ' not found!!!'));

//Launch server
app.listen(CONSTANTS.APP_PORT, () => console.log('App ready in port', CONSTANTS.APP_PORT));

module.exports = app;