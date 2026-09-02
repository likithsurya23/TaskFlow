const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/taskflow";
        
        console.log("Connecting to MongoDB...");
        const conn = await mongoose.connect(mongoUri, {
            dbName: "taskflow",
            serverSelectionTimeoutMS: 10000 // 10s timeout for cloud services like Render
        });

        console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host} (DB: ${conn.connection.name})`);
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        console.error("💡 Check list for Render deployment:");
        console.error(" 1. Is MONGO_URI set in Render Environment Variables?");
        console.error(" 2. In MongoDB Atlas -> Network Access, is 0.0.0.0/0 added?");
        console.error(" 3. Are username/password correct in MONGO_URI?");
    }
};

// Monitor connection events
mongoose.connection.on("connected", () => {
    console.log("🟢 Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
    console.error("🔴 Mongoose connection error:", err.message);
});

mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ Mongoose connection disconnected");
});

module.exports = connectDB;