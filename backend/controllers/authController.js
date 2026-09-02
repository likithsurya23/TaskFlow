const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id, email, name) => {
    return jwt.sign(
        { id, email, name },
        process.env.JWT_SECRET || "default_secret",
        { expiresIn: "7d" }
    );
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const userExists = await User.findOne({ email: email.toLowerCase() });
        if (userExists) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword
        });

        const token = generateToken(user._id, user.email, user.name);
        return res.status(201).json({
            user: { id: user._id, name: user.name, email: user.email },
            token
        });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: error.message || "Registration failed" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user._id, user.email, user.name);
        return res.json({
            user: { id: user._id, name: user.name, email: user.email },
            token
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: error.message || "Login failed" });
    }
};

const getMe = async (req, res) => {
    if (req.user) {
        return res.json({ user: req.user });
    }
    return res.status(401).json({ message: "Not authenticated" });
};

module.exports = {
    registerUser,
    loginUser,
    getMe
};
