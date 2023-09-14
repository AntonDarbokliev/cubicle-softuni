const indexController = require("../controlllers/indexController.js");
const createController = require("../controlllers/createController.js");
const aboutController = require("../controlllers/aboutController.js");
const NotFoundController = require('../controlllers/404Controller.js')


module.exports = (app)=>{
    app.use(indexController);
    app.use("/create", createController);
    app.use("/about", aboutController);
    app.use("*", NotFoundController);

}
