import featuredServices from "../services/featured.services.js";

const featured = new featuredServices()

export default class featuredController{

    addFeatured = async (req, res, next) => {
        try {
            const { newFeatured } = await featured.addFeatured(req);
            res.status(200).json({success: true, featuredInfo: newFeatured});
        } catch (error) {
            next(error)
        }
    };

    getFeatured = async (req, res, next) => {
        try {
            const featuredList = await featured.getFeatured();
            res.status(200).json({success: true, featuredList: featuredList});
        } catch (error) {
            next(error)
        }
    };
}