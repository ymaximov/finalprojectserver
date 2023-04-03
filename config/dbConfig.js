const mongoose = require('mongoose');

mongoose
        .set("strictQuery", false)
        .connect(process.env.MONGO_URL)
        console.log("MongoDB is connected")


module.exports = mongoose;