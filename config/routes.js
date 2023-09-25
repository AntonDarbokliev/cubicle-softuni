const indexController = require("../controlllers/indexController.js");
const createController = require("../controlllers/createController.js");
const aboutController = require("../controlllers/aboutController.js");
const NotFoundController = require('../controlllers/404Controller.js');
const createAccessoryController  = require("../controlllers/createAccessoryController.js");
const attachAccessoryController = require ('../controlllers/attachAccessoryController.js');
const authController = require("../controlllers/authController.js");
const editController = require('../controlllers/editController.js')
const deleteController = require('../controlllers/deleteController.js')
const { hasUser } = require("./middlewares/guard.js");


module.exports = (app)=>{
    app.use(indexController);
    app.use("/create/cube",hasUser ,createController);
    app.use("/create/accessory",hasUser ,createAccessoryController);
    app.use("/about", aboutController);
    app.use("/attach/accessory",hasUser ,attachAccessoryController);
    app.use("/edit",hasUser ,editController);
    app.use("/delete",hasUser ,deleteController);
    app.use("/auth", authController);
    app.use("*", NotFoundController);

}
