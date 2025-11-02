import projectFile from "../models/project.files.model.js";
import Featured from "../models/featured.model.js";
import AppError from "../utils/app.error.class.js";
import { v2 as cloudinary } from "cloudinary";

export default class projectFileServices{

    createProjectFiles = async (req) => {
        try {
            const id = req.params.id;

            if (!req.file) {
                throw new AppError({ message: "No file uploaded", status: 400 });
            }

            // const featured = await Featured.findById(id)

            // if(!featured) throw new AppError({message: "Project not found", status: 404})

            const { path, filename, mimetype } = req.file;
            
            const result = req.file;

            // 💾 Save file info in MongoDB
            const newProjectFile = await projectFile.create({
                projectId: id,
                fileName: filename,
                filePath: path,
            });

            if (!newProjectFile) {
                throw new AppError({ message: "Project file not created", status: 500 });
            }

            return newProjectFile;
        } catch (error) {
            throw error;
        }
    };

    getFilepath = async (req) => {
        // Get project id
        const projectId = req.params.id
        try {
            // Check if project id is in database
            const query = projectFile.findOne({projectId: projectId});

            const foundProjectFile = await query.select('filePath')
            if(!foundProjectFile) throw new AppError({message: "Project not found", status: 404});

            return foundProjectFile
        } catch (error) {
            throw error
        }
    }

    deleteFile = async (req) => {
        try {
            const { id } = req.body;
            if (!id) {
                throw new AppError({ message: "No file specified", status: 400 });
            }

            // Find and delete from DB
            const deletedFile = await projectFile.findOne({ projectId: id });

            if (!deletedFile) {
                throw new AppError({ message: "File not found in database", status: 404 });
            }

            // Delete from Cloudinary
            const cloudRes = await cloudinary.uploader.destroy(deletedFile.fileName, {resource_type: 'video'});

            if (cloudRes.result === "ok") {
                await projectFile.findOneAndDelete({ projectId: id });
                return { message: "File deleted successfully", deletedFile };
            } else if (cloudRes.result === "not found") {
                throw new AppError({ message: "File not found on Cloudinary", status: 404 });
            } else {
                throw new AppError({ message: "File could not be deleted from Cloudinary", status: 500 });
            }
        } catch (error) {
            throw error;
        }
    };
}