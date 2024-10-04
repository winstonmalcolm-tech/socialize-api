const passport = require("passport");
const LocalStrategy = require("passport-local");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/userModel");

const register = async (req,res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400);
        next("Please fill all fields");
        return;
    }

    
    const isUsernameAvailable = await User.findOne({username: username});

    if (isUsernameAvailable) {
        res.status(400);
        next("Username already in use");
        return;
    }

    if (password.length < 6) {
        res.status(400);
        next("Password length should be 6 and greater");
        return;
    }

    const hashedPassword = await bcrypt.hash(password,10);
    
    const user = new User({username: username, password: hashedPassword});
    const result = await user.save();

    if (result.errors) {
        next("Error creating");
        return;
    }

    res.status(201).json({msg: "Congratulation, Welcome"});

}

const login = (req,res) => {

}

const getUsers = (req,res) => {

}

const getUser = (req,res) => {

}

const searchUser = (req,res) => {

}

const logout = (req,res) => {

}

module.exports = {
    register,
    login,
    getUsers,
    getUser,
    searchUser,
    logout

}