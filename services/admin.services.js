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

    getAdmin = async (req) => {
        try {
            // Send response
            return req.user
        } catch (error) {
            throw error
        }
    }

    deleteAdmin = async (req) => {
        try {
            const Id = req.user.id;

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
            const Id = req.user.id;

            // Check if admin is in database
            const admin = await Admin.findById(Id);
            if(!admin) throw new AppError({message: "Admin not found", status: 404});

            // Get information from request body
            const {name, email} = req.body;

            // Check if email is already in database
            if (email) {
                const foundAdmin = await Admin.findOne({ email });
                if (foundAdmin && foundAdmin._id.toString() !== Id) {
                    throw new AppError({message: "Email already in use", status: 403});
                }
            }
            
            const newAdminData = await Admin.findByIdAndUpdate(
                Id,
                {name, email},
                {new: true, runValidators: true}
            );

            if(!newAdminData) throw new AppError({message: "Admin not found", status: 404});

            const updatedAdmin = {
                name: newAdminData.name,
                email: newAdminData.email,
                role: newAdminData.role,
                _id: newAdminData._id
            }

            // Send response
            return {success: true, updatedAdmin};
        } catch (error) {
            throw error
        }
        
    }

    changePassword = async (req) => {
        const id = req.user.id
        const {newPassword, currentPassword} = req.body

        try{
            const admin = await Admin.findById(id).select('+password')

            if(!admin) throw new AppError({message: "Invalid credentials", status: 400})

            const currentIsSame = await bcrypt.compare(currentPassword, admin.password);
            if (!currentIsSame) throw new AppError({ message: "Invalid credentials", status: 400 });

            const isSame = await bcrypt.compare(newPassword, admin.password);
            if (isSame) throw new AppError({ message: "Invalid credentials", status: 400 });

            if(newPassword.length < 12) throw new AppError({message: "Password must be at least 12 characters long.", status: 400})

            if (!/\d/.test(newPassword)) throw new AppError({message: "Password must contain at least one number.", status: 400})

            if (!/[^A-Za-z0-9]/.test(newPassword)) throw new AppError({message: "Password must contain at least one symbol.", status: 400})

            const hashedPassword = await bcrypt.hash(newPassword, 12);
            admin.password = hashedPassword;
            await admin.save();

            return { success: true, message: "Password updated successfully." };
        }catch(err){
            throw err
        }
    }
}