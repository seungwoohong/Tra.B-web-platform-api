const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./src/route");

// MiddleWare
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Routing
//TODO: 폴더 구조 조정하기
router.forEach(route => {
  console.log(route);
  if (route != "index.js") {
    app.use("/" + route, require("./src/route/" + route));
  }
});
module.exports = app;
