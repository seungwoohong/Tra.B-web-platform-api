const express = require("express");
const bodyParser = require("body-parser");
const router = require("./src/route");

const app = express();

// MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// Routing
// TODO: 폴더 구조 조정하기
router.forEach((route) => {
  console.log(route);
  if (route !== "index.js") {
    const routeElement = require(`./src/route/${route}`);
    app.use(`/${route}`, routeElement);
  }
});
module.exports = app;
