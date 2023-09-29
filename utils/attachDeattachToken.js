function attachToken(req, res, data) {
    const token = req.singJwt(data);
    res.cookie("jwt", token);
  }
  
  function deattachToken(res) {
    res.clearCookie("jwt");
  }

  
  module.exports = {
    attachToken,
    deattachToken
  }