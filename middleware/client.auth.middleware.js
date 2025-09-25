import jwt from 'jsonwebtoken';
import Client from '../models/client.model.js';

const clientAuth = async (req, res, next) => {
  try {
    const token = req.cookies.client_jwt;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // Check if user exists
    const client = await Client.findById(decoded.userId);
    if (!client) return res.status(403).json({ message: 'Forbidden' });

    // Check role
    if (decoded.role !== client.role) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Attach client info to request
    req.user = {
      id: client._id,
      role: client.role
    };

    next();

  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default clientAuth;
