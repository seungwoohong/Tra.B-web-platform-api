const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

// router path
const api = './src/route/';

// MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// Routing
// TODO: 폴더 구조 조정하기
fs.readdirSync(api).forEach(route => {
  app.use('/' + route, require(api + route));
});

module.exports = app;
