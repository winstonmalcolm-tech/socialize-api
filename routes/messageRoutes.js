const express = require("express");
const router = express.Router();

router.get("/", (req,res) => {
    console.log("Hello from message routes")
});

module.exports = router;