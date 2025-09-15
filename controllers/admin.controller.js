import adminServices from "../services/admin.services.js";
const adminServ = new adminServices()

export default class adminController{
    
    registerAdmin = async (req, res, next) => {
        try {
            // Call register function from admin services class
            const newAdmin = await adminServ.register(req);

            // Send response
            res.status(201).json({success: true, newAdmin});
        } catch (error) {
            next(error)
        }
    }

    getAllAdmins = async (req, res, next) => {
        try {
            // Call getAllAdmins function from admin services class
            const admins = await adminServ.getAllAdmins()

            // Send response
            res.status(200).json({success: true, admins});
        } catch (error) {
            next(error)
        }
    }

    getAdmin = async (req, res, next) => {
        try {
            // Call getAdmin function from admin service class
            const admin = await adminServ.getAdmin(req);

            // Send response
            res.status(200).json({success: true, admin});
        } catch (error) {
            next(error);
        }
    }

    delete = async (req, res, next) => {
        try{
            // Call deleteAdmin function from admin service class
            await adminServ.deleteAdmin(req);

            // Send response
            res.status(200).json({success: true, message: "Admin deleted"});
        } catch (error){
            next(error)
        }
    }

    update = async (req, res, next) =>{
        try {
            // Call updateAdmin function from admin service class
            const admin = adminServ.updateAdmin(req);

            console.log(admin)
            // Send response
            res.status(200).json({success: true, admin});
        } catch (error) {
            next(error);
        }
        
    }
}