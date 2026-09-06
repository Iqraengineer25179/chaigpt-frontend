import express from "express";
import { placeOrder, userOrders, listOrders, updateStatus, deleteOrder } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// POST /api/order/place         — authenticated user places an order
router.post("/place", authMiddleware, placeOrder);

// POST /api/order/userorders    — authenticated user fetches their own orders
router.post("/userorders", authMiddleware, userOrders);

// GET  /api/order/list          — admin: view all orders
router.get("/list", listOrders);

// POST /api/order/status        — admin: update order status
router.post("/status", updateStatus);

// DELETE /api/order/delete/:id  — admin: delete an order
router.delete("/delete/:id", deleteOrder);

export default router;
