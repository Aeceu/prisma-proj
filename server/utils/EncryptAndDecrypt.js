const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
  const hashedPass = await bcrypt.hash(password, 12);
  return hashedPass;
};

const decryptPassword = async (password, hashedPass) => {
  const isValid = await bcrypt.compare(password, hashedPass);
  return isValid;
};

module.exports = { encryptPassword, decryptPassword };
