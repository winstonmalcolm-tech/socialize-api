const express = require("express");
const {createRoom, joinRoom, leaveRoom, getRooms, getRoom, deleteRoom} = require("../controllers/roomControllers");
const authorize = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", authorize, createRoom);

router.put("/join/:roomid", authorize, joinRoom);

router.put("/leaveroom/:roomid", authorize, leaveRoom);

router.get("/getrooms", authorize, getRooms);

router.get("/getroom/:roomid", authorize, getRoom);

router.delete("/delete/:roomid", authorize, deleteRoom);

module.exports = router;