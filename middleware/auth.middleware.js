import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js';

export const authenticate = async (req, res, next) => {
  try {
    const { access } = req.cookies;
    if (!access) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(access, process.env.JWT_ACCESS_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });

      const { user } = decoded;
      if (!user || !user._id || !user.role) {
        return res.status(403).json({ message: 'Invalid token payload' });
      }

      // Check which model to query based on role
      const foundUser = await Admin.findById(user._id);

      if (!foundUser) return res.status(403).json({ message: 'User not found' });

      // Attach user info to request for later use
      if(foundUser.role === 'admin'){
        req.user = {
            id: user._id,
            email: user.email,
            role: user.role,
            name: user.name
        };
      }

      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};