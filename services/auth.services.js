import bcrypt from 'bcrypt'
import crypto from "crypto";
import Admin from '../models/admin.model.js'
import Client from '../models/client.model.js'
import AppError from '../utils/app.error.class.js'
import { sendEmail } from '../utils/email.util.js';
import jwt from 'jsonwebtoken'
import { 
    JWT_ACCESS_EXPIRE, JWT_ACCESS_SECRET, JWT_REFRESH_EXPIRE, JWT_REFRESH_SECRET, FRONTEND_URL
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
                {"userId": newAdmin._id},
                JWT_ACCESS_SECRET,
                {expiresIn: JWT_ACCESS_EXPIRE}
            );

            // Generate refresh token
            const refreshToken = jwt.sign(
                {"userId": newAdmin._id},
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
                    userId: admin._id, 
                    role: admin.role
                },
                JWT_ACCESS_SECRET,
                {expiresIn: JWT_ACCESS_EXPIRE }
            );

            const refreshToken = jwt.sign(
                { 
                    userId: admin._id, 
                    role: admin.role
                },
                JWT_REFRESH_SECRET,
                { expiresIn: JWT_REFRESH_EXPIRE }
            );

            // Save refresh token in DB
            admin.refreshToken.push(refreshToken);
            if (admin.refreshToken.length > 2) {
                admin.refreshToken = admin.refreshToken.slice(-2);
            }
            await admin.save();

            const savedAdmin = { name: admin.name, email: admin.email, role: admin.role, _id: admin._id };

            return { savedAdmin, accessToken, refreshToken };
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
            foundAdmin.refreshToken = [];
            await foundAdmin.save();

            // Send success
            return {success: true}
        } catch (error) {
            throw error
        }
    };

    verifyClientEmail = async (req) => {
        // Extract email from req body
        const { email } = req.body

        try{
            // Check if email was provided
            if(!email) throw new AppError({message: 'Email required', status: 400});
            
            // Check if client is in database via email
            const client = await Client.findOne({email: email});
            if(!client) throw new AppError({message: 'User not found', status: 404})
            
            // Set reset and hashed reset tokens
            const resetToken = crypto.randomBytes(32).toString("hex");
            const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

            // Update password reset token field
            client.passwordResetToken = hashedToken;
            client.passwordResetExpires = Date.now() + 15 * 60 * 1000;
            await client.save();

            // Send email with reset token
            const url = `${FRONTEND_URL}forgot/reset-password/${resetToken}`;
            try {
                await sendEmail({to:email, subject:'Reset pin', templateName:'pinReset', variables:{email,url}})
            } catch (error) {
                client.passwordResetToken = undefined;
                client.passwordResetExpires = undefined;
                await client.save();
                throw new AppError({message: 'Something went wrong: '+error, status: 500})
            }

            return true
        } catch(err) {
            throw err
        }
    };

    resetPin = async (req) => {
        const { token } = req.params;
        const { pin } = req.body;

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const client = await Client.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        }).select("+password");

        if (!client) {
            throw new AppError({message: 'Invalid or expired token', status: 400})
        }

        client.pin = await bcrypt.hash(pin, 10);
        client.passwordResetToken = undefined;
        client.passwordResetExpires = undefined;
        await client.save();

        return true
    };

}