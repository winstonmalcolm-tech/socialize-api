const express = require("express");
const {createRoom, joinRoom, leaveRoom, getRooms, getRoom, deleteRoom} = require("../controllers/roomControllers");
const authorize = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", authorize, createRoom);

router.put("/join/:id", authorize, joinRoom);

router.put("/leaveroom/:id", authorize, leaveRoom);

router.get("/getrooms", authorize, getRooms);

router.get("/getroom/:id", authorize, getRoom);

router.delete("/deleteroom/:id", authorize, deleteRoom);

module.exports = router;