import bcrypt from 'bcrypt'
import AppError from '../utils/app.error.class.js'
import Admin from '../models/admin.model.js';

export default class adminServices{
    register = async (req) => {
        try {
            // Get admin information from request body
            const {name, email, password} = req.body;

            // Check if email is already in the database
            const oldAdmin = await Admin.findOne({email});

            if(oldAdmin) throw new AppError("Email already in use", 409);

            // Hash password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Register user
            const newAdmin = await Admin.create({
                name: name,
                email: email,
                password: hashedPassword
            });

            return {newAdmin};
        } catch (error) {
            throw error;
        }
        
    }

    getAllAdmins = async () => {
        try {
            // Get all admins
            const admins = await Admin.find();

            // Check if there are any admins
            if(admins.length === 0) throw new AppError("No admins found", 404);

            // Send admins if found
            return admins
        } catch (error) {
            throw error
        }
       

    }

    getAdmin = async (req) => {
        try {
            // Get admin id from request params
            const Id = req.params.id;

            // Check if admin is in database
            const foundAdmin = await Admin.findById(Id);
            if(!foundAdmin) throw new AppError("Unauthorized", 403)

            // Send response
            return foundAdmin
        } catch (error) {
            throw error
        }
    }

    deleteAdmin = async (req) => {
        try {
            // Get id from request params
            const Id = req.params.id;

            // Check if admin is in database
            const admin = await Admin.findById(Id);
            if(!admin) throw new AppError("Admin not found", 404);

            // Delete admin from database
            await Admin.findByIdAndDelete(Id);

            // Send response
            return {success: true};
        } catch (error) {
            throw error
        }
    }

    updateAdmin = async (req) => {
        try {
            // Get id from request params
            const Id = req.params.id;

            // Check if admin is in database
            const admin = await Admin.findById(Id);
            if(!admin) throw new AppError("Admin not found", 404);

            // Get information from request body
            const {name, email} = req.body;

            // Check if email is already in database
            if (email) {
                const foundAdmin = await Admin.findOne({ email });
                if (foundAdmin && foundAdmin._id.toString() !== Id) {
                    throw new AppError("Email already in use", 403);
                }
            }
            
            const updatedAdmin = await Admin.findByIdAndUpdate(
                Id,
                {name, email},
                {new: true, runValidators: true}
            );

            if(!updatedAdmin) throw new AppError("Admin not found", 404);

            // Send response
            return updatedAdmin;
        } catch (error) {
            throw error
        }
        
    }
}