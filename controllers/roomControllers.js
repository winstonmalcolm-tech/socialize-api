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

    try {
        const roomID = req.params.roomid;

        if (roomID == null) {
            res.status(400);
            throw new Error("room ID missing");
        }


        const room = await Room.findById(roomID);

        room.members = room.members.filter(id => id !== req.id);

        await Room.findByIdAndUpdate(roomID, {members: room.members});

        res.status(200).json({message: "Remove successfully"});


    } catch(error) {
        next(error.message);
    }
}

const getRooms = async (req,res, next) => {
    
    try {
        const rooms = await Room.find({});

        res.status(200).json({rooms: rooms});
    } catch(error) {
        next(error.message);
    }

}

const getRoom = async (req,res, next) => {
    try {
        const roomID = req.params.roomid;

        if (!roomID) {
            res.status(400);
            throw new Error("room ID missing");
        }

        const room = await Room.findById(roomID);

        if (!room) {
            res.status(404);
            throw new Error("Room not found");
        }

        res.status(200).json({room: room});

    } catch(error) {
        next(error.message);
    }
    

}

const deleteRoom = async (req,res, next) => {
    
    try {
        const roomID = req.params.roomid;

        if (!roomID) {
            res.status(400);
            throw new Error("room ID missing");
        }

        const room = await Room.findById(roomID);

        if (!room) {
            res.status(404);
            throw new Error("Room not found");
        }

        if (req.id !== room._id) {
            res.status(401);
            throw new Error("Not authorized to delete");
        }

        await Room.findByIdAndDelete(roomID);
        res.status(200).json({message: "Deleted"});

    } catch (error) {
        next(error.message);
    }
}

module.exports = {
    createRoom,
    joinRoom,
    leaveRoom,
    getRooms,
    getRoom,
    deleteRoom
}