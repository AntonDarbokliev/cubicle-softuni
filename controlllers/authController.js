const User = require("../models/User.js");
const { login, register } = require("../services/authService.js");

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
      err
    });
  }
});

router.get("/register", (req, res) => {
  res.render("registerPage", {
    title: "Register",
  });
});

router.post("/register", async (req, res) => {
  try {
    if (
      req.body.password.trim() === "" ||
      req.body.repeatPassword.trim() === ""
    ) {
      throw new Error("All fields are required!");
    }
    if (req.body.password.trim() !== req.body.repeatPassword.trim()) {
      throw new Error("Passwords must match!");
    }
    const result = await register(req.body.username, req.body.password);
    attachToken(req, res, result);
    res.redirect("/");
  } catch (err) {
    res.render("registerPage", {
      title: "Register",
      // error : err.message.split('\n')
    });
  }
});

router.get("/logout", (req, res) => {
  deattachToken(res);
  res.redirect('/')
});

function attachToken(req, res, data) {
  const token = req.singJwt(data);
  res.cookie("jwt", token);
}

function deattachToken(res) {
  res.clearCookie("jwt");
}

module.exports = router;
