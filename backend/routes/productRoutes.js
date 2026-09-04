import express from "express";
import multer from "multer";
import path from "path";
import { addFood, listFood, removeFood } from "../controllers/productController.js";

const router = express.Router();

// ── Multer storage config ─────────────────────────────────────────────────────
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");             // files saved to /uploads folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase())
        && allowedTypes.test(file.mimetype);
    if (isValid) {
        cb(null, true);
    } else {
        cb(new Error("Only image files (jpeg, jpg, png, webp) are allowed."));
    }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // 5 MB limit

// ── Routes ────────────────────────────────────────────────────────────────────

// POST /api/food/add  — multipart/form-data with an "image" field
router.post("/add", upload.single("image"), addFood);

// GET /api/food/list
router.get("/list", listFood);

// POST /api/food/remove  — body: { id }
router.post("/remove", removeFood);

export default router;
