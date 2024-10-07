const mongoose = require("mongoose");

const RoomModel = new mongoose.Schema({
    roomName: {
        type: String,
        required: [true, "Please enter a room name"]
    },
    members: {
        type: Array,
        required: [false]
    },

    ownerId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, "Please enter owner id"]
    }
});

module.exports = mongoose.model("room", RoomModel)