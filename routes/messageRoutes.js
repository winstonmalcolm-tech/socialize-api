const express = require("express");
const {sendMessage, getChatMessages, getRoomMessages, deleteMessages} = require("../controllers/messageControllers");
const router = express.Router();


router.post("/send", sendMessage);

router.get("/getchatmessages", getChatMessages);

router.get("/getroommessages/:id", getRoomMessages);

router.delete("/deletemessages/:roomid", deleteMessages);

module.exports = router;