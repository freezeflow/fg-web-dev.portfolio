import { Router } from "express";
import multer from "multer";
import clientFileController from "../controllers/client.files.controller.js";

import { storage } from "../config/cloudinary.js";
import authenticate from "../middleware/auth.middleware.js";
import { validateFilename, validateId } from "../validations/client.file.validation.js";

const upload = multer({
  storage: storage("clients"),
  limits: { fileSize: 5 * 1024 * 1024 }
})

const clientFileRoutes = Router();
const clientFileControl = new clientFileController();

// Upload file for a client
clientFileRoutes.post(
  "/:id", 
  validateId,
  authenticate,
  upload.single("file"),
  clientFileControl.uploadClientFile
);

// Get all files for a client
clientFileRoutes.get(
  "/:id",
  validateId,
  authenticate,
  clientFileControl.getClientFiles
);

// Download file by filename
clientFileRoutes.get(
  "/download/:filename",
  validateFilename,
  authenticate,
  clientFileControl.downloadClientFile
);

// Delete a file (expects { id } in req.body)
clientFileRoutes.delete(
  "/:id",
  validateId,
  authenticate,
  clientFileControl.deleteClientFile
);

export default clientFileRoutes;
