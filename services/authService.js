const bcrypt = require("bcrypt");
const User = require("../models/User.js");

async function login(username, password) {
    const existing = await User.findOne({username: {$regex : new RegExp(username),$options: "i"}});
    if(!existing){
        throw new Error('No such user exists!')
    }

    const match = await bcrypt.compare(password,existing.hashedPassword)

    if(!match){
        throw new Error('Incorrect username or password')
    }

    return {
        username : existing.username
    }

}

async function register(username, password) {
  const existing = await User.findOne({username: {$regex : new RegExp(username),$options: "i"}});
  if (existing) {
    throw new Error("Username is taken!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);


  const user = await User.create({
    username,
    hashedPassword
  })

//   console.log(user);

  return {
    username : user.username
}

}

module.exports = {
  login,
  register
};
