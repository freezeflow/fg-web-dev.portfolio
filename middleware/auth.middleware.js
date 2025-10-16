import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js';
import Client from '../models/client.model.js';

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
      let foundUser = null;
      if (user.role === 'admin') {
        foundUser = await Admin.findById(user._id);
      } else if (user.role === 'client') {
        foundUser = await Client.findById(user._id);
      }

      if (!foundUser) return res.status(403).json({ message: 'User not found' });

      // Attach user info to request for later use
      if(foundUser.role === 'admin'){
        req.user = {
            id: user._id,
            email: user.email,
            role: user.role,
            name: user.name
        };
      } else if(foundUser.role === 'client'){
        req.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            company: user.company,
            location: user.location,
            createdAt: user.createdAt,
            projects: user.projects,
            role: user.role
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