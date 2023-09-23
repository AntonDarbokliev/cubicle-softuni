const { login } = require("../services/authService.js");

const router = require("express").Router();

router.get("/login", (req, res) => {
  res.render("loginPage", {
    title: "Login",
  });
});

router.post("/login", async (req, res) => {
  const result = await login(req.body.username, req.body.password);
  const token = req.singJwt(result);
  res.cookie('jwt',token)
  res.redirect('/')
});

module.exports = router;
