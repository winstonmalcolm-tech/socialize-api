const Room = require("../models/roomModel");
const Message = require("../models/messageModel");


const sendMessage = (req,res) => {
    
}

const getRoomMessages = async (req,res) => {
    try {
        const roomID = req.params.roomid;

        if (!roomID) {
            res.status(400);
            throw new Error("Room ID missing");
        }

        const messages = await Message.find({room_id: roomID});

        
        res.status(200).json({messages: messages});


    } catch(error) {
        next(error.message)
    }
}

const getChatMessages = async (req,res, next) => {

    try {
        const {contactID} = req.body;

        if (!contactID) {
            res.status(400);
            throw new Error("contact ID missing");
        }

        const messages = await Message.find({$or: [{"sender_id": req.id}, {"sender_id": contactID}, {"receiver_id": req.id}, {"receiver_id": contactID}]});

        res.status(200).json({messages: messages});

    } catch(error) {
        next(error.message)
    }

}

const deleteRoomMessages = async (req,res,next) => {

    try {

        const roomID = req.params.roomid;

        if (!roomID) {
            res.status(400);
            throw new Error("Room ID missing");
        }

        await Message.deleteMany({room_id: roomID});


    } catch(error) {
        next(error.message);
    }
}

module.exports = {
    sendMessage,
    getChatMessages,
    getRoomMessages,
    deleteRoomMessages
}