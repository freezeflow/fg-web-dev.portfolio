import jwt from 'jsonwebtoken'
import Admin from '../models/admin.model.js'
import AppError from '../utils/app.error.class.js'
import { 
    JWT_ACCESS_EXPIRE, 
    JWT_ACCESS_SECRET,
    JWT_REFRESH_EXPIRE, 
    JWT_REFRESH_SECRET
} from '../config/config.js'

class tokenServices{
    rotateToken = async (refreshToken) =>{
        try {
            // Check if token is in databse
            const admin = await Admin.findOne({refreshToken});
            if(!admin) throw new AppError({message: "Forbidden1", status: 403});

            // Check if refresh token is most recent
            const isMostRecent = admin.refreshToken[admin.refreshToken.length - 1] === refreshToken
            if(!isMostRecent){

                // Invalidate tokens
                admin.refreshToken = [];
                await admin.save();
                throw new AppError({message: "Forbidden2", status: 403});
            }
            
            // Verify refresh token
            let decoded
            try {
                decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET)
            } catch (error) {
                throw new AppError({message:"Forbidden3", status: 403});
            }

            // Check if user id from token matches id from database
            const adminId = await Admin.findById(decoded.userId);
            if (!adminId) throw new AppError({message: "Forbidden4", status: 403});

            // Generate new access token
            const accessToken = jwt.sign(
                {"userId": adminId._id},
                JWT_ACCESS_SECRET,
                {expiresIn: JWT_ACCESS_EXPIRE}
            );

            // Generate new refresh token
            const newRefreshToken = jwt.sign(
                {"userId": adminId._id},
                JWT_REFRESH_SECRET,
                {expiresIn: JWT_REFRESH_EXPIRE}
            );

            // Add new refresh token to database
            admin.refreshToken.push(newRefreshToken);

            // Remove old token from database
            if(admin.refreshToken.length > 2) admin.refreshToken = admin.refreshToken.slice(-2)
            await admin.save();

            return {accessToken, newRefreshToken};
        } catch (error) {
            throw error
        }
    }
}

export default tokenServices