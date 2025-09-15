import projectFile from "../models/project.files.model.js";
import AppError from "../utils/app.error.class.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";

export default class projectFileServices{

    createProjectFiles = async (req) => {
        try {
            // Get project id from request params
            const id = req.params.id

            // Helper for __dirname in ES Modules
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);

            // Get file
            const file = req.files && req.files.file;

            // Create file path
            const filePath = path.join(__dirname, '..', '..', 'uploads', file.name)

            // Move file to /uploads directory
            await file.mv(filePath);

            // Store relative path in DB
            const dbFilePath = `/uploads/${file.name}`;

            // Create new file document in database
            const newProjectFile = await projectFile.create({
                projectId: id,
                filePath: dbFilePath
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

    downloadFile = async (req) => {
        try {
            // Get filename from request params
            const filename = req.params.filename

            // Helper for __dirname in ES Modules
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);

            // Folder containing files to download
            const FILES_DIR = path.join(__dirname, '..', '..', 'uploads');

            const filePath = path.join(FILES_DIR, filename);

            // Prevent access to files outside uploads
            if (path.relative(FILES_DIR, filePath).includes('..')) {
                throw new AppError({message: 'Forbidden', status: 403})
            }

            // Check if file exists
            await fs.access(filePath, fs.constants.F_OK);

            return {filePath, filename}
        } catch (error) {
            throw error
        }
    }

    deleteFile = async (req) => {
        try {
            // Get file id from req body
            const fileId = req.body.id

            // Check if file is regestered in db
            const projectFiles = await projectFile.findById(fileId);
            if(!projectFiles) throw new AppError({message: 'File not found', status: 404});

            // Find file path
            const relativePath = projectFiles.filePath

            // Check if file path was found
            if(!relativePath) throw new AppError("File path not found", 404);

            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);

            // Create absolute path using relative path
            const absolutePath = path.join(__dirname, '..', '..', relativePath);

            // Delete the file from the filesystem
            try {
                await fs.unlink(absolutePath);
            } catch (err) {
                if (err.code !== 'ENOENT') throw new AppError({message: 'Something went wrong, please try again', status: 505});
            }

            // Delete project from database
            await projectFile.findByIdAndDelete(fileId);

            return {success: true}
        } catch (error) {
            throw error
        }
        
    }
}