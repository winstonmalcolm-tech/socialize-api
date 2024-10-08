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

const joinRoom = async (req,res, next) => {

    try {
        const roomID = req.params.roomid;

        if (roomID == null) {
            res.status(400);
            throw new Error("room ID missing");
        }

        const room = await Room.findById(roomID);

        if (room.members.includes(req.id)) {
            res.status(302);
            throw new Error("Already joined");
        }

        room.members.push(req.id)
        await Room.findByIdAndUpdate(roomID, {members: room.members});

        res.status(200).json({message: "Joined successfully"});
    
    } catch(error) {
        next(error.message);
    }
    

}

const leaveRoom = async (req, res, next) => {

}

const getRooms = async (req,res, next) => {
    
    try {
        const rooms = await Room.find({});

        res.status(200).json({rooms: rooms});
    } catch(error) {
        next(error.message);
    }

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