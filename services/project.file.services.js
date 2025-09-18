import projectFile from "../models/project.files.model.js";
import AppError from "../utils/app.error.class.js";
import { v2 as cloudinary } from "cloudinary";

export default class projectFileServices{

    createProjectFiles = async (req) => {
        try {
            // Get project id from request params
            const id = req.params.id

            // Get file
            const { path, filename } = req.file;

            // Create new file document in database
            const newProjectFile = await projectFile.create({
                projectId: id,
                fileName: filename,
                filePath: path
            });

            // Check if project was saved in the database
            if(!newProjectFile) throw new AppError({message: "Project file not created", status: 500})

            // Send response
            return newProjectFile
        } catch (error) {
            throw error
        }
    }

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
            const cloudRes = await cloudinary.uploader.destroy(deletedFile.fileName, {resource_type: 'image'});

            if (cloudRes.result === "ok") {
            // Only clean up DB if Cloudinary deleted the file
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