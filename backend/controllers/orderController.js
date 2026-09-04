import orderModel from "../modals/orderModal.js";
import userModel from "../modals/userModal.js";

// ── Place Order ───────────────────────────────────────────────────────────────
// POST /api/order/place   (auth required)
// body: { items, amount, address, paymentMethod }

const placeOrder = async (req, res) => {
    try {
        const { items, amount, address, paymentMethod } = req.body;

        if (!items || !items.length || !amount || !address) {
            return res.status(400).json({ success: false, message: "items, amount, and address are required." });
        }

        const newOrder = new orderModel({
            userId: req.userId,
            items,
            amount,
            address,
            paymentMethod: paymentMethod || "COD",
            // For online payment simulation we treat it as paid immediately;
            // COD stays false until delivery.
            payment: paymentMethod === "Online",
            status: "Processing",
        });

        await newOrder.save();

        // Clear the user's cart after placing order
        await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

        res.status(201).json({ success: true, message: "Order placed successfully.", data: newOrder });
    } catch (error) {
        console.error("Place Order Error:", error.message);
        console.error(error.stack);
        res.status(500).json({ success: false, message: error.message || "Server error while placing order." });
    }
};

// ── Get Orders for Logged-in User ─────────────────────────────────────────────
// POST /api/order/userorders   (auth required)
// userId is read from req.userId (set by authMiddleware from the verified JWT).
// We intentionally do NOT read from req.body.userId — that would be insecure
// as any client could forge a different user's ID in the request body.

const userOrders = async (req, res) => {
    try {
        const userId = req.userId; // guaranteed by authMiddleware
        const orders = await orderModel
            .find({ userId })
            .sort({ createdAt: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("User Orders Error:", error.message);
        res.status(500).json({ success: false, message: "Server error while fetching your orders." });
    }
};

// ── List All Orders (Admin) ───────────────────────────────────────────────────
// GET /api/order/list

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate("userId", "username email")
            .sort({ createdAt: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("List Orders Error:", error.message);
        res.status(500).json({ success: false, message: "Server error while fetching orders." });
    }
};

// ── Update Order Status (Admin) ───────────────────────────────────────────────
// POST /api/order/status
// body: { orderId, status }
// Valid statuses: "Processing" | "Out for Delivery" | "Delivered"

const VALID_STATUSES = ["Processing", "Out for Delivery", "Delivered"];

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        if (!orderId || !status) {
            return res.status(400).json({ success: false, message: "orderId and status are required." });
        }

        if (!VALID_STATUSES.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`,
            });
        }

        const order = await orderModel.findByIdAndUpdate(
            orderId,
            {
                status,
                // Mark as paid when delivered (COD)
                ...(status === "Delivered" && { payment: true }),
            },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found." });
        }

        res.json({ success: true, message: "Order status updated.", data: order });
    } catch (error) {
        console.error("Update Status Error:", error.message);
        res.status(500).json({ success: false, message: "Server error while updating order status." });
    }
};

export { placeOrder, userOrders, listOrders, updateStatus };
