const express = require("express");
const expressConfig = require("./config/express.js");
const routeConfig = require("./config/routes.js");
const databaseConfig = require('./config/database.js')

async function start() {
  const app = express();
  await databaseConfig(app)
  expressConfig(app);
  routeConfig(app);


  app.listen(3000, () => console.log("Server running on port 3000"));
}

start();
