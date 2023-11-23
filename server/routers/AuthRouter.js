const express = require("express");
const {
  handleLogOut,
  handleLogin,
  handleSignUp,
} = require("../controllers/AuthController");

const router = express.Router();

//TODO: Handle auth.
router.post("/login", handleLogin);
router.post("/signup", handleSignUp);
router.get("/logout", handleLogOut);

module.exports = router;
