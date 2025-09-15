import mongoose from "mongoose";
const {Schema} = mongoose;

// Create admin schema using mongoose
const adminSchema = Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        validate: (v) => {
            return v.length > 8
        },
        message: 'Password must be more than 8 characters',
        select: false
    },
    email: {
        type: String,
        require: true,
        validate: (v) => {
            return /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        unique: true,
        message: 'Invalid email'
    },
    role: {
        type: String,
        default: 'admin',
        enum: ['admin'],
        immutable: true
    },
    refreshToken: [String]
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt'}
});

// Create admin model
const Admin = mongoose.model('Admin', adminSchema);

export default Admin;