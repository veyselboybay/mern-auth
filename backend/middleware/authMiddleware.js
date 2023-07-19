import jwt from "jsonwebtoken";
import User from '../models/userModel.js'

const protect = async (req, res, next) => {
    let token;
    try {
        token = req.cookies.jwt;
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await User.findById(decoded.userId).select('-password');
                next()
            } catch (error) {
                res.status(401);
            throw new Error('Not Authorized, invalid token')
            }
        } else {
            res.status(401);
            throw new Error('Not Authorized, no token')
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export {protect}