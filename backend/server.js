require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend app
const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001"
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(null, origin); // Allow requests from any local development origin
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Initialize MongoDB database connection
connectDB();

// Health check endpoint
app.get("/", (req, res) => {
    res.json({ message: "TaskFlow API is running smoothly 🚀", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Global Error Handler:", err.stack);
    res.status(500).json({ message: err.message || "Internal Server Error" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});