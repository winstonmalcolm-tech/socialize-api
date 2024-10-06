const passport = require("passport");
const LocalStrategy = require("passport-local");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/userModel");

const generateToken = (id) => {
    token = jwt.sign({id},process.env.JWT_SECRET_KEY);

    return token;
}

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

    res.status(201).json({authId: generateToken(user._id), msg: "Congratulation, Welcome"});

}

const login = async (req,res, next) => {
    const { password, username } = req.body;

    const user = await User.findOne({username});

    if (!user) {
        res.status(404);
        next("Not found");
        return;
    }

    if ((await bcrypt.compare(password, user.password))) {
        res.status(200).json({authId: generateToken(user._id)});
        return;
    }

    res.status(404);
    next("Incorrect credentials");
}

const getUsers = async (req,res) => {

    const users = await User.find({_id: {$ne: req.id}}, {fields: {password: 0} });

    res.status(200).json({users: users});

}

const getUser = async (req,res) => {

    const user = await User.findById(req.id).select("-password -_id");

    res.status(200).json(user);

}

const searchUser = async (req,res) => {
    const searchVal = req.query.q;

    const foundedUsers = await User.find({_id: {$ne: req.id} ,username: {$regex: ".*"+ searchVal +".*", $options: "i"}}).limit(5);
    
    res.status(200).json({users: foundedUsers});
}

const logout = (req,res) => {
    //TODO
}

module.exports = {
    register,
    login,
    getUsers,
    getUser,
    searchUser,
    logout

}