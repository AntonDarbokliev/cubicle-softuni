const express = require("express");
const hbs = require("express-handlebars").create({
  extname: ".hbs",
});

const indexController = require("./controlllers/indexController.js");
const createController = require("./controlllers/createController.js");
const aboutController = require("./controlllers/aboutController.js");
const detailsController = require("./controlllers/detailsController.js");

const app = express();

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("static"));

app.use(indexController);
app.use("/create", createController);
app.use("/about", aboutController);

app.listen(3000, () => console.log("Server running on port 3000"));
