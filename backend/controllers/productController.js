import productModel from "../modals/productModal.js";
import fs from "fs";
import path from "path";

// ── Add Food Item ─────────────────────────────────────────────────────────────
// POST /api/food/add  (multipart/form-data — image field handled by Multer)

const addFood = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required." });
        }

        const { name, description, price, category } = req.body;

        if (!name || !description || !price || !category) {
            // Remove uploaded file if validation fails
            fs.unlink(req.file.path, () => {});
            return res.status(400).json({ success: false, message: "All fields (name, description, price, category) are required." });
        }

        const product = new productModel({
            name,
            description,
            price: Number(price),
            category,
            image: req.file.filename,   // store only the filename; serve via /images static route
        });

        await product.save();
        res.status(201).json({ success: true, message: "Food item added successfully.", data: product });
    } catch (error) {
        console.error("Add Food Error:", error.message);
        res.status(500).json({ success: false, message: "Server error while adding food item." });
    }
};

// ── List All Food Items (getAllProducts) ──────────────────────────────────────
// GET /api/food/list or GET /api/food

const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, data: products });
    } catch (error) {
        console.error("List Food Error:", error.message);
        res.status(500).json({ success: false, message: "Server error while fetching food items." });
    }
};

// Alias for backward compatibility
const listFood = getAllProducts;

// ── Remove Food Item ──────────────────────────────────────────────────────────
// POST /api/food/remove   body: { id }

const removeFood = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Product ID is required." });
        }

        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Food item not found." });
        }

        // Delete the associated image from the uploads folder
        const imagePath = path.join("uploads", product.image);
        fs.unlink(imagePath, (err) => {
            if (err) console.warn("Could not delete image file:", err.message);
        });

        await productModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Food item removed successfully." });
    } catch (error) {
        console.error("Remove Food Error:", error.message);
        res.status(500).json({ success: false, message: "Server error while removing food item." });
    }
};

// Alias for backward compatibility
const deleteProduct = removeFood;

// ── Get Single Product ─────────────────────────────────────────────────────────
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);
        
        if (!product) {
            return res.status(404).json({ success: false, message: "Food item not found." });
        }
        
        res.json({ success: true, data: product });
    } catch (error) {
        console.error("Get Product Error:", error.message);
        res.status(500).json({ success: false, message: "Server error while fetching product." });
    }
};

// ── Create Product ─────────────────────────────────────────────────────────────
const createProduct = addFood;

// ── Update Product ─────────────────────────────────────────────────────────────
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category } = req.body;

        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Food item not found." });
        }

        // Update fields
        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = Number(price);
        if (category) product.category = category;

        // Handle image upload if provided
        if (req.file) {
            const imagePath = path.join("uploads", product.image);
            fs.unlink(imagePath, (err) => {
                if (err) console.warn("Could not delete old image:", err.message);
            });
            product.image = req.file.filename;
        }

        product.updatedAt = new Date();
        await product.save();

        res.json({ success: true, message: "Food item updated successfully.", data: product });
    } catch (error) {
        console.error("Update Product Error:", error.message);
        res.status(500).json({ success: false, message: "Server error while updating product." });
    }
};

// ── Search Products ───────────────────────────────────────────────────────────
const searchProducts = async (req, res) => {
    try {
        const { q } = req.query;
        
        if (!q) {
            return res.status(400).json({ success: false, message: "Search query is required." });
        }

        const products = await productModel.find({
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } },
                { category: { $regex: q, $options: 'i' } }
            ]
        });

        res.json({ success: true, data: products });
    } catch (error) {
        console.error("Search Products Error:", error.message);
        res.status(500).json({ success: false, message: "Server error while searching products." });
    }
};

export { addFood, listFood, removeFood, getAllProducts, getProduct, createProduct, updateProduct, deleteProduct, searchProducts };
