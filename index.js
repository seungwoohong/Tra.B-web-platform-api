const express = require('express');
const app = express(); 
const bodyParser = require('body-parser'); 

// Module
var user = require('./src/route/users');
var diary = require('./src/route/diarys');

// MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routing
app.use('/users', user);
app.use('/diarys', diary);

module.exports = app;
