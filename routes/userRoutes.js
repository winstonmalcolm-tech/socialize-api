const express = require("express");
const router = express.Router();

router.get("/", (req,res) => {
    console.log("Hello from user routes")
    res.status(200).json({msg: "Hi there"})
});

module.exports = router;