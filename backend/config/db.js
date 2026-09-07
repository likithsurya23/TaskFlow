const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;

        if (!mongoUri) {
            console.warn("⚠️ MONGO_URI is NOT defined in environment variables! Render requires setting MONGO_URI in Environment Settings.");
        }

        const uriToUse = mongoUri || "mongodb://127.0.0.1:27017/taskflow";
        const isAtlas = uriToUse.includes("mongodb+srv");
        console.log(`Connecting to MongoDB (${isAtlas ? "MongoDB Atlas Cloud" : "Local Database"})...`);

        const conn = await mongoose.connect(uriToUse, {
            dbName: "taskflow",
            serverSelectionTimeoutMS: 8000
        });

        console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host} (DB: ${conn.connection.name})`);
    } catch (error) {
        console.error("❌ Primary MongoDB Connection Error:", error.message);

        // Attempt automatic fallback to In-Memory Virtual DB if installed
        try {
            console.log("🔄 Attempting automatic fallback to In-Memory Virtual MongoDB...");
            const { MongoMemoryServer } = require("mongodb-memory-server");
            const mongoServer = await MongoMemoryServer.create();
            const fallbackUri = mongoServer.getUri();
            const conn = await mongoose.connect(fallbackUri, { dbName: "taskflow" });
            console.log(`⚠️ NOTE: Connected to Temporary In-Memory MongoDB. Data will reset when Render restarts!`);
            console.log(`✅ Fallback Virtual In-Memory MongoDB Connected Successfully! (${conn.connection.host})`);
        } catch (fallbackError) {
            console.error("\n💡 Database Connection Troubleshooting Checklist for Render & Atlas:");
            console.error(" 1. Render Env Vars: Add `MONGO_URI` to Render Service -> Settings -> Environment Variables.");
            console.error(" 2. Atlas Network Access: Add `0.0.0.0/0` in MongoDB Atlas -> Security -> Network Access (Render dynamic IPs get blocked otherwise).");
            console.error(" 3. Atlas DB User: Verify username & password in connection string (`mongodb+srv://user:pass@cluster...`).");
            console.error(" 4. Virtual In-Memory DB: In-memory DBs do NOT persist data across Render container restarts or sleep cycles.\n");
        }
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