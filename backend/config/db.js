const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 3000 // Quick timeout if Mongo isn't running locally
        });
        console.log(`MongoDB connected successfully: ${conn.connection.host}`);
    } catch (error) {
        console.warn("⚠️ Local MongoDB connection failed or MongoDB is not running:", error.message);
        console.warn("💡 Tip: Ensure MongoDB service is started on mongodb://127.0.0.1:27017 or update MONGO_URI in .env.");
    }
};

module.exports = connectDB;