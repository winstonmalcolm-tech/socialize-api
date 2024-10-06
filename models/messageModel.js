const mongoose = require("mongoose");

const messageModel = new mongoose.Schema({
    sender_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, "Please enter sender ID"]
    },
    receiver_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [false]
    },
    message: {
        type: String,
        required: [true]
    },
    date: {
        type: Date,
        default: () => new Date(+new Date() + 7*24*60*60*1000)
    },
    room_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [false]
    }
});

module.exports = mongoose.model("message", messageModel);