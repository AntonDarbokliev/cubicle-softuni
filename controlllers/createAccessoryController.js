const { createAccessory } = require("../services/accessoryService.js");
const { body, validationResult } = require("express-validator");
const createErrorObject = require("../utils/createErrorObject.js");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("createAccessory", {
    title: "Create an Accessory",
  });
});

router.post("/",
  body("name")
    .matches(/[a-z A-Z0-9]+/).withMessage("Name may only contain english letters and numbers"),
  body("description")
    .matches(/[a-z A-Z0-9]+/).withMessage("The description may only contain english letters and numbers"),
  body("imageUrl")
  .matches(/^https?:\/\/.*/).withMessage("Invalid URL")
  ,async (req, res) => {
    try {
      const {errors} = validationResult(req);

      if (errors.length > 0) {
        console.log(errors);
        createErrorObject(errors);
      }
      await createAccessory(req.body);
      res.redirect("/");
    } catch (err) {
      res.render("createAccessory", {
        title: "Request error",
        err,
        body: {
          name: req.body.name,
        },
      });
    }
  }
);

module.exports = router;
