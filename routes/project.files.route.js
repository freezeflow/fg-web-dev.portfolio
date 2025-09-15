import { Router } from "express";
import authenticate from '../middleware/auth.middleware.js'
import projectFileController from "../controllers/project.files.conroller.js";

import filePayloadExists from "../middleware/file.payload.exists.middleware.js";
import fileSizeLimitter from "../middleware/file.size.limiter.js";
import fileExtLimiter from "../middleware/file.ext.limiter.js";

import fileUpload from "express-fileupload";
import { validateDeleteFile, validateDownloadFile, validateFilesId } from "../validations/project.files.validation.js";

const projectFileRoutes = Router()
const projectFileControl = new projectFileController()

projectFileRoutes.post('/:id', validateFilesId, authenticate, fileUpload({createParentPath: true}), filePayloadExists, fileSizeLimitter, fileExtLimiter(['.jpg', '.jpeg', '.png']), projectFileControl.createProjectFile );

projectFileRoutes.get('/:id', validateFilesId, projectFileControl.getFilepathControl)

projectFileRoutes.get('/download/:filename', validateDownloadFile, authenticate, projectFileControl.downLoadFile)

projectFileRoutes.delete('/', validateDeleteFile, authenticate, projectFileControl.deleteFile)

export default projectFileRoutes