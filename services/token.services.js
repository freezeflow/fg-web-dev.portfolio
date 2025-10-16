import jwt from 'jsonwebtoken'
import Admin from '../models/admin.model.js'
import AppError from '../utils/app.error.class.js'
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, JWT_ACCESS_EXPIRE, JWT_REFRESH_EXPIRE } from '../config/config.js'

class tokenServices {
  async rotateToken(req) {
    try {
        if(!req.cookies?.refresh) throw new AppError({message: 'Unauthorized', status: 401 })

        const refreshToken = req.cookies.refresh

        // 1. Find admin that owns this token
        const admin = await Admin.findOne({
          refreshToken: { $in: [req.cookies?.refresh.trim()] }
        });
        if (!admin) throw new AppError({ message: 'Forbidden', status: 403 });

        // 2. Verify the refresh token
        let decoded;
      try {
        decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
      } catch (err) {
        throw new AppError({ message: 'Forbidden', status: 403 });
      }

      // 3. Compare IDs
      if (decoded.user._id.toString() !== admin._id.toString()) {
        throw new AppError({ message: 'Forbidden', status: 403 });
      }

      // 4. Generate new tokens
      const payload = {
        user: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      };

      const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
        expiresIn: JWT_ACCESS_EXPIRE,
      });

      const newRefreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
        expiresIn: JWT_REFRESH_EXPIRE,
      });

      // 5. Replace old refresh token with new one
      admin.refreshToken = admin.refreshToken.filter(t => t !== refreshToken);
      admin.refreshToken.push(newRefreshToken);
      await admin.save();

      // 6. Return new tokens
      return { accessToken, newRefreshToken };

    } catch (error) {
      throw error;
    }
  }
}

export default tokenServices;