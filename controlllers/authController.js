const { login, register, doesExist } = require("../services/authService.js");
const {body, validationResult } = require('express-validator');
const createErrorObject = require("../utils/createErrorObject.js");
const { deattachToken, attachToken } = require("../utils/attachDeattachToken.js");

const router = require("express").Router();

router.get("/login", (req, res) => {
  res.render("loginPage", {
    title: "Login",
  });
});

router.post("/login",
body('username')
.custom(async (value) => {
 const exists = await doesExist(value)
 if(!exists){
  throw new Error ('No such user exists')
 }
})
,
async (req, res) => {
  try {

    const {errors} = validationResult(req)

    if(errors.length > 0) {
      createErrorObject(errors)
    } 

    const result = await login(req.body.username, req.body.password);
    attachToken(req, res, result);
    res.redirect("/");
  } catch (err) {
    res.render("loginPage", {
      title: "Login",
      err,
      body : {
        username : req.body.username
      }
    });
  }
});

router.get("/register", (req, res) => {
  res.render("registerPage", {
    title: "Register",
  });
}); 

router.post("/register",
  body('username')
  .notEmpty().withMessage('Username field is required').bail()
  .isAlphanumeric().withMessage('Username may only contain english letters and numbers')
  .isLength({min : 5}).withMessage('Username should not be under 5 characters long'),
  body('password')
  .notEmpty().withMessage('Password field is required').bail()
  .isLength({min : 8}).withMessage('Password must be at least 8 characters long'),
  body('repeatPassword')
  .custom((value, { req }) => {
    if(value !== req.body.password){
      throw new Error('Re-Password doesn\'t match with the password')
    }

    return true
  })
  , async (req, res) => {
  try {

    const {errors} = validationResult(req)

    if(errors.length > 0) {
      createErrorObject(errors)
    }       

    const result = await register(req.body.username, req.body.password);
    attachToken(req, res, result);
    res.redirect("/");
  } catch (err) {
    res.render("registerPage", {
      title: "Register",
      err,
      body : {
        username : req.body.username
      }
    });
  }
});

router.get("/logout", (req, res) => {
  deattachToken(res);
  res.redirect("/");
});

module.exports = router;
