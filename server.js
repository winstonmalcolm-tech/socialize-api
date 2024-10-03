const express = require("express");

const messageRoutes = require("./routes/messageRoutes");
const roomRoutes = require("./routes/roomRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/message", messageRoutes);
app.use("/room",roomRoutes);
app.use("/user", userRoutes);

app.listen(port,()=>console.log("listening on port ",port));