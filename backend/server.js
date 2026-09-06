import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// dotenv.config() is safe to call on Vercel too —
// it simply does nothing when no .env file exists,
// and Vercel's injected env vars are already in process.env.
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app  = express();
const PORT = process.env.PORT || 4000;

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            if (
                allowedOrigins.includes(origin) ||
                origin.endsWith(".netlify.app") ||
                origin.endsWith(".vercel.app")
            ) {
                return callback(null, true);
            }
            return callback(new Error(`CORS blocked: ${origin}`));
        },
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/images", express.static(path.join(__dirname, "uploads")));

// ── DB middleware — connects once and caches (serverless-safe) ────────────────
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("DB connection failed:", err.message);
        res
            .status(500)
            .json({ success: false, message: "Database connection error: " + err.message });
    }
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
    res.json({ success: true, message: "chai-gpt API is running." });
});

app.use("/api/user",  userRoutes);
app.use("/api/food",  productRoutes);
app.use("/api/order", orderRoutes);

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err.message);
    res.status(500).json({ success: false, message: err.message || "Internal server error." });
});

// ── Local dev server — NOT used on Vercel (serverless) ───────────────────────
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

export default app;
