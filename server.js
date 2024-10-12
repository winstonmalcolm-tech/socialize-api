const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/dbConfig");
const errorHandler = require("./middlewares/errorMiddleware");

const messageRoutes = require("./routes/messageRoutes");
const roomRoutes = require("./routes/roomRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

dbConnect();

app.use("/message", messageRoutes);
app.use("/room",roomRoutes);
app.use("/user", userRoutes);

app.use(errorHandler);

app.listen(port,()=>console.log("listening on port ",port));