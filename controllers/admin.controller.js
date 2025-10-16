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
            const result = await adminServ.updateAdmin(req);

            // Send response
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    updatePassword = async (req, res, next) => {
        try {
            // Call updateAdmin function from admin service class
            const result = await adminServ.changePassword(req);

            // Send response
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}