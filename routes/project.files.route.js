import multer from "multer";
import { Router } from "express";
import {authenticate, authorizeRole} from '../middleware/auth.middleware.js'
import projectFileController from "../controllers/project.files.conroller.js";

import { storage } from "../config/cloudinary.js";
import { validateDeleteFile, validateDownloadFile, validateFilesId } from "../validations/project.files.validation.js";

const upload = multer({
    storage: storage("projects"),
    limits: { fileSize: 5 * 1024 * 1024 }
});

const projectFileRoutes = Router()
const projectFileControl = new projectFileController()

projectFileRoutes.post('/:id', 
    validateFilesId, 
    authenticate, authorizeRole('admin'), 
    upload.single("file"),
    projectFileControl.createProjectFile 
);

projectFileRoutes.get('/:id', validateFilesId, authenticate, authorizeRole('admin'), projectFileControl.getFilepathControl)

projectFileRoutes.delete('/', validateDeleteFile, authenticate, authorizeRole('admin'), projectFileControl.deleteFile)

export default projectFileRoutes