const { Schema, default: mongoose } = require("mongoose");

const UserModel = new Schema({
    username: {
        type: String,
        required: [true, "Please enter username"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"]
    }
})

module.exports = mongoose.model("user", UserModel);