import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js';
import { JWT_ACCESS_SECRET } from '../config/config.js';

const authenticate = (req, res, next) => {
    // Check if there is an auth header
    if(!req.headers.authorization || !req.headers.authorization.includes('Bearer ')) return res.status(401).json({message: 'Unauthorized'});

    // Check if token exists
    const token = req.headers.authorization.split(' ')[1]
    if(!token) return res.status(401).json({message: 'Unauthorized'});
    
    // Verify token
    jwt.verify(
        token,
        JWT_ACCESS_SECRET,
        async (err, decoded) => {
            if(err) return res.status(403).json({message: 'Forbidden'});

            // Check if user exists
            const admin = await Admin.findById(decoded.userId)
            if(!admin) return res.status(403).json({message: 'Forbidden'});

            // Set id in request
            req.id = decoded.userId;
            next()
        }
    )
}

export default authenticate