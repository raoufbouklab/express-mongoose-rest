const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");

router
  .post("/login", login)
  .post("/register", register)
  .post("/logout", logout);

module.exports = router;
