const jwt = require('jsonwebtoken') 

module.exports = (jwtSecret) => (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const data = jwt.verify(token, jwtSecret);
      req.user = data;
    } catch (err) {
      res.clearCookie("jwt");
      return res.redirect("/auth/login");
    }
  }

    req.singJwt = (data) => jwt.sign(data,jwtSecret)  

  next();
};
