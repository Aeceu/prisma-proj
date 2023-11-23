const jwt = require("jsonwebtoken");

const createToken = (userdata) => {
  const token = jwt.sign({ userdata }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

module.exports = createToken;
