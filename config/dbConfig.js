const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);

        console.log(`Database running ${conn.connection.host}`);
    } catch (error) {
        console.log("Database ERROR ", error)
        process.exit(1);
    }
}

module.exports = dbConnect;