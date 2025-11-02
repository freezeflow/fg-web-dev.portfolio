import Featured from "../models/featured.model.js";
import Project from "../models/project.model.js";
import projectFile from "../models/project.files.model.js";
import Client from "../models/client.model.js";
import AppError from "../utils/app.error.class.js";
import {toObjectId} from "../utils/mongoose.utils.js"

export default class featuredServices {
    addFeatured = async (req) => {
        try {
            const { projectId, clientId, role, testimonial, link } = req.body;

            const objectProjectId = await toObjectId(projectId)

            // Fetch protected data
            const project = await Project.findById(objectProjectId).select("_id title description tech");
            const client = await Client.find(objectProjectId).select("name company");

            if(!project) throw new AppError({message: "Project not found", status: 404})

            // Store denormalized data
            const newFeatured = await Featured.create({
            projectId: project._id,
            clientId: client._id || null,
            projectInfo: project ? project.toObject() : {},
            clientInfo: client ? client : {},
            role,
            testimonial,
            link,
            });

            return newFeatured
        } catch (error) {
            throw error
        }
    };

    getFeatured = async () => {
        try {
            const featuredList = await Featured.find().sort({ createdAt: -1 });
            if(featuredList.length === 0) throw new AppError({message: "No featured projects found", status: 404})
            return featuredList
        } catch (error) {
            throw error
        }
    };
}