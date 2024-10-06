const express = require("express");
const {register, login, getUsers, searchUser, logout, getUser} = require("../controllers/userControllers");
const authorize = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getUsers", authorize, getUsers);
router.get("/search", authorize, searchUser);
router.get("/getUser", authorize, getUser);
router.get("/logout", authorize, logout);

module.exports = router;