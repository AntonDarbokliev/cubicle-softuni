const { login, register } = require("../services/authService.js");
const {body, validationResult } = require('express-validator')

const router = require("express").Router();

router.get("/login", (req, res) => {
  res.render("loginPage", {
    title: "Login",
  });
});

router.post("/login", async (req, res) => {
  try {
    const result = await login(req.body.username, req.body.password);
    attachToken(req, res, result);
    res.redirect("/");
  } catch (err) {
    res.render("loginPage", {
      title: "Login",
      err,
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
      const errorMessages = []
      errors.forEach(error => {  
        errorMessages.push([error.path,error.msg])
      });
      console.log(errorMessages);
      throw Object.fromEntries(errorMessages)
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

function attachToken(req, res, data) {
  const token = req.singJwt(data);
  res.cookie("jwt", token);
}

function deattachToken(res) {
  res.clearCookie("jwt");
}

module.exports = router;
