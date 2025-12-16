import bcrypt from 'bcrypt'
import Admin from '../models/admin.model.js'
import AppError from '../utils/app.error.class.js'
import jwt from 'jsonwebtoken'
import { 
    JWT_ACCESS_EXPIRE, 
    JWT_ACCESS_SECRET, 
    JWT_REFRESH_EXPIRE, 
    JWT_REFRESH_SECRET, 
    FRONTEND_URL
} from '../config/config.js'

export default class authServices{

    registerAdmin = async (req) =>{
        try {
            // Get registration body
            const {name, email, password} = req.body

            // Check if email is already in the database
            const oldAdmin = await Admin.findOne({email})

            if(oldAdmin) throw new AppError({message: "Email already in use", status: 409})

            // Hash password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            
            // Register user
            const newAdmin = await Admin.create({
                name: name,
                email: email,
                password: hashedPassword
            })

            // Generate access token
            const accessToken = jwt.sign(
                { 
                    user: { name: newAdmin.name, email: newAdmin.email, role: newAdmin.role, _id: newAdmin._id }, 
                },
                JWT_ACCESS_SECRET,
                {expiresIn: JWT_ACCESS_EXPIRE}
            );

            // Generate refresh token
            const refreshToken = jwt.sign(
                { 
                    user: { name: newAdmin.name, email: newAdmin.email, role: newAdmin.role, _id: newAdmin._id }, 
                },
                JWT_REFRESH_SECRET,
                {expiresIn: JWT_REFRESH_EXPIRE}
            );

            // Save refresh token in batabase
            newAdmin.refreshToken = refreshToken;
            await newAdmin.save();

            if(newAdmin) return {newAdmin, accessToken, refreshToken};
            
        } catch (error) {
            throw error
        }
    };

    loginAdmin = async (req) => {
        try {
            const { email, password } = req.body;

            // Quick input check
            if (!email || !password) {
                throw new AppError({ message: "Email and password required", status: 400 });
            }

            // Find admin by email
            const admin = await Admin.findOne({ email }).select('+password');
            if (!admin || !admin.password) {
                throw new AppError({ message: "Email or password invalid", status: 404 });
            }

            // Compare passwords
            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (!isPasswordValid) {
                throw new AppError({ message: "Email or password invalid", status: 404 });
            }

            // Generate tokens
            const accessToken = jwt.sign(
                { 
                    user: { name: admin.name, email: admin.email, role: admin.role, _id: admin._id }, 
                },
                JWT_ACCESS_SECRET,
                {expiresIn: JWT_ACCESS_EXPIRE }
            );

            const refreshToken = jwt.sign(
                { 
                    user: { name: admin.name, email: admin.email, role: admin.role, _id: admin._id },
                },
                JWT_REFRESH_SECRET,
                { expiresIn: JWT_REFRESH_EXPIRE }
            );

            // Save refresh token in DB
            admin.refreshToken.push(refreshToken)
            await admin.save();

            const savedAdmin = { name: admin.name, email: admin.email, role: admin.role, _id: admin._id };

            const latestToken = admin.refreshToken[admin.refreshToken.length - 1]

            return { savedAdmin, accessToken, latestToken };
        } catch (error) {
            throw error;
        }
    };

    logoutAdmin = async (req) => {
        try {
            // Get id of the admin trying to logout from request params
            const adminId = req.params.id

            // Check if admin exist in database
            const foundAdmin = await Admin.findById(adminId)
            if(!foundAdmin) return {success: true}

            // Clear tokens from database
            foundAdmin.refreshToken = "";
            await foundAdmin.save();

            // Send success
            return {success: true}
        } catch (error) {
            throw error
        }
    };

}