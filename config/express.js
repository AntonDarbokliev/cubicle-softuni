const express = require("express");
const auth = require("./middlewares/auth.js");
const hbs = require("express-handlebars").create({
  extname: ".hbs",
});

const jwtSecret = "jasdfnoai21smd";

const cookieParser = require("cookie-parser");

module.exports = (app) => {
  app.engine(".hbs", hbs.engine);
  app.set("view engine", ".hbs");

  app.use(express.urlencoded({ extended: true }));
  app.use("/static", express.static("static"));
  
  app.use(cookieParser());
  app.use(auth(jwtSecret))
};
