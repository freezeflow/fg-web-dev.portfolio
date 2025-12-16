import featuredServices from "../services/featured.services.js";

const featured = new featuredServices()

export default class featuredController{

    createFeatured = async (req, res, next) => {
        try {
            const { newFeatured } = await featured.createFeatured(req);
            res.status(200).json({success: true, featuredInfo: newFeatured});
        } catch (error) {
            next(error)
        }
    };

    updateFeatured = async (req, res, next) => {
        try {
            const featuredProject = await featured.updateFeatured(req);
            res.status(200).json({success: true, featuredProject});
        } catch (error) {
            next(error)
        }
    };

    deleteFeatured = async (req, res, next) => {
        try {
            const message = await featured.deleteFeatured(req);
            res.status(200).json({success: true, message});
        } catch (error) {
            next(error)
        }
    };

    getFeatured = async (req, res, next) => {
        try {
            const featuredProject = await featured.getFeatured(req);
            res.status(200).json({success: true, featuredProject});
        } catch (error) {
            next(error)
        }
    };

    getAllFeatured = async (req, res, next) => {
        try {
            const featuredList = await featured.getAllFeatured(req);
            res.status(200).json({success: true, featuredList});
        } catch (error) {
            next(error)
        }
    };
}