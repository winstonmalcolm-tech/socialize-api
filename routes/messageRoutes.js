const express = require("express");
const {sendMessage, getChatMessages, getRoomMessages, deleteMessages} = require("../controllers/messageControllers");
const authorize = require("../middlewares/authMiddleware");
const router = express.Router();


router.post("/send", authorize, sendMessage);

router.get("/getchatmessages", authorize, getChatMessages);

router.get("/getroommessages/:id", authorize, getRoomMessages);

router.delete("/deletemessages/:roomid", authorize, deleteMessages);

module.exports = router;