import {sendEmail} from "../utils/email.util.js"
import featuredServices from "../services/featured.services.js";

const featured = new featuredServices()

export const sendEmailCtr = async (req, res, next) =>{
    try {
        const response = await sendEmail(req.body.message, req.body.email, req.body.name)

        res.json({status: 200, message: 'Email sent'})
    } catch (error) {
        next(error)
    }
}

export const getAllFeatured = async (req, res, next) => {
    try {
        const featuredList = await featured.getAllFeatured(req);
        res.status(200).json({success: true, featuredList});
    } catch (error) {
        next(error)
    }
};