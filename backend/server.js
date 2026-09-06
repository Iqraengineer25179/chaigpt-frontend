import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// ── __dirname shim for ES Modules ─────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// ── Database ──────────────────────────────────────────────────────────────────
connectDB();

// ── Middleware ────────────────────────────────────────────────────────────────
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    // Netlify
    "https://chaigpt-frontend.netlify.app",
    "https://agent-6a9c1f7f951ee5457fd94ca7--chaigpt-frontend.netlify.app",
    // Vercel frontend
    "https://chaigpt-frontend.vercel.app",
    "https://chaigpt-frontend-oc2u.vercel.app",
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow no-origin requests (Postman, mobile, server-to-server)
        if (!origin) return callback(null, true);
        // Allow any *.netlify.app or *.vercel.app subdomain
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
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images as static files
app.use("/images", express.static(path.join(__dirname, "uploads")));

// ── Routes ────────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ success: true, message: "chai-gpt API is running." });
});

app.use("/api/user", userRoutes);
app.use("/api/food", productRoutes);
app.use("/api/order", orderRoutes);

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).json({ success: false, message: err.message || "Internal server error." });
});

// ── Serverless Export & Conditional Listen ────────────────────────────────────
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;