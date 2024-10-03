const express = require("express");
const {createRoom, joinRoom, leaveRoom, getRooms, getRoom, deleteRoom} = require("../controllers/roomControllers");
const router = express.Router();

router.post("/create", createRoom);

router.put("/join/:id", joinRoom);

router.put("/leaveroom/:id", leaveRoom);

router.get("/getrooms", getRooms);

router.get("/getroom/:id", getRoom);

router.delete("/deleteroom/:id", deleteRoom);

module.exports = router;