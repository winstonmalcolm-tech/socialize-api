const Room = require("../models/roomModel");

const createRoom = async (req,res, next) => {
    const { roomName } = req.body;

    if (!roomName) {
        res.status(400);
        next("roomName field missing");
        return;
    }

    const room = new Room({roomName: roomName, members: [req.id], ownerId: req.id});

    await room.save();

    res.status(201).json({message: "Created successfully"});
}

const joinRoom = (req,res, next) => {

}

const leaveRoom = (req, res, next) => {

}

const getRooms = (req,res, next) => {

}

const getRoom = (req,res, next) => {

}

const deleteRoom = (req,res, next) => {

}

module.exports = {
    createRoom,
    joinRoom,
    leaveRoom,
    getRooms,
    getRoom,
    deleteRoom
}