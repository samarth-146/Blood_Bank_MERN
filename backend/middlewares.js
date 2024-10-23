require('dotenv').config();
const jwt=require('jsonwebtoken');
const JWT_SECRET=process.env.JWT_SECRET;
const Admin = require('./models/Admin');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        console.log("Token not found in request");
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Decoded token:", decoded);
        req.user = decoded.id;
        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        res.status(401).json({ message: "Token is not valid" });
    }
};

const adminAuthMiddleware = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        console.log(decoded);
        decoded.role='admin';
        req.admin = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports={authMiddleware,adminAuthMiddleware};