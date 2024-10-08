const express = require("express");
const {sendMessage, getChatMessages, getRoomMessages, deleteRoomMessages} = require("../controllers/messageControllers");
const authorize = require("../middlewares/authMiddleware");
const router = express.Router();


router.post("/send", authorize, sendMessage);

router.get("/getchatmessages", authorize, getChatMessages);

router.get("/getroommessages/:id", authorize, getRoomMessages);

router.delete("/deleteroommessages/:roomid", authorize, deleteRoomMessages);

module.exports = router;