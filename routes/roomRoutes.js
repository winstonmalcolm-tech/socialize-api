const express = require("express");
const router = express.Router();

router.get("/", (req,res)=> {
    console.log("Hello from room routes")
});

module.exports = router;