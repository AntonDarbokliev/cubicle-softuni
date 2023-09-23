const indexController = require("../controlllers/indexController.js");
const createController = require("../controlllers/createController.js");
const aboutController = require("../controlllers/aboutController.js");
const NotFoundController = require('../controlllers/404Controller.js');
const createAccessoryController  = require("../controlllers/createAccessoryController.js");
const attachAccessoryController = require ('../controlllers/attachAccessoryController.js');
const authController = require("../controlllers/authController.js");
 

module.exports = (app)=>{
    app.use(indexController);
    app.use("/create/cube", createController);
    app.use("/create/accessory", createAccessoryController);
    app.use("/about", aboutController);
    app.use("/attach/accessory", attachAccessoryController);
    app.use("/auth", authController);
    app.use("*", NotFoundController);

}
