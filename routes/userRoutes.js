const express = require("express");
const {register, login, getUsers, searchUser, logout, getUser} = require("../controllers/userControllers");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getUsers", getUsers);
router.get("/search", searchUser);
router.get("/getUser/:id", getUser);
router.get("/logout", logout);

module.exports = router;