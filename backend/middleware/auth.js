import jwt from "jsonwebtoken";

/**
 * authMiddleware
 *
 * Accepts the JWT in either format:
 *   1. Custom header:      { token: "<jwt>" }          (used by frontend/admin)
 *   2. Authorization header: "Bearer <jwt>"            (standard REST format)
 *
 * On success, attaches req.userId (the MongoDB _id string) for use in controllers.
 */
const authMiddleware = (req, res, next) => {
    // Try custom `token` header first, then fall back to Authorization: Bearer
    let token = req.headers.token;

    if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided. Access denied." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
};

export default authMiddleware;
