const { adminModel } = require('../models/admin.js');
const redisClient = require('../service/redis.service.js');
const { verifyToken } = require('../utils/jwt.js');

const adminAuth = async (req, res, next) => {
    try {
        const token = req.cookies.authToken || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: "Access Denied. No token provided." });
        }

        const isBlacklisted = await redisClient.get(token);
        if (isBlacklisted) {
            return res.status(401).json({ error: "Invalid or expired token." });
        }

        const decoded = await verifyToken(token);
        const admin = await adminModel.findById(decoded.id).select('-password');
        if (!admin) {
            return res.status(401).json({ error: "Admin not found or invalid token." });
        }

        req.admin = admin;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Authentication failed. Invalid or expired token." });
    }
};

module.exports = adminAuth;
