const express = require('express');
const app = express(); 
const bodyParser = require('body-parser'); 

// Module
var user = require('./src/route/users');

// MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routing
app.use('/users', user);

// Server 
app.listen(3000, function() {
    console.log('server is running port 3000!');
});
