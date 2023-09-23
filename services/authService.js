async function login(username, password) {
  return new Promise((res, rej) => {
    if (username.toLowerCase() == "peter" && password == "123456") {
      res({
        _id: "293486c598234cebf",
        username: "Peter",
      });
    } else {
      rej(new Error("Incorrect password or username"));
    }
  });
}

module.exports = {
  login,
};
