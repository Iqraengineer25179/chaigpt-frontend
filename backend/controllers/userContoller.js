import userModel from "../modals/userModal.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// ── Helpers ──────────────────────────────────────────────────────────────────

const createToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// ── Register ─────────────────────────────────────────────────────────────────

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists with this email." });
        }

        // Validate password length
        if (!password || password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters." });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save user
        const newUser = new userModel({ username, email, password: hashedPassword });
        const user = await newUser.save();

        const token = createToken(user._id);
        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error("Register Error:", error.message);
        res.status(500).json({ success: false, message: "Server error during registration." });
    }
};

// ── Login ─────────────────────────────────────────────────────────────────────

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        }

        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ success: false, message: "Server error during login." });
    }
};

export { registerUser, loginUser };
