import { Router } from "express";
import clientFileController from "../controllers/client.files.controller.js";

import authenticate from "../middleware/auth.middleware.js";
import filePayloadExists from "../middleware/file.payload.exists.middleware.js";
import fileSizeLimitter from "../middleware/file.size.limiter.js";
import fileUpload from "express-fileupload";
import { validateFilename, validateId } from "../validations/client.file.validation.js";

const clientFileRoutes = Router();
const clientFileControl = new clientFileController();

// Upload file for a client
clientFileRoutes.post(
  "/:id", 
  validateId,
  authenticate,
  fileUpload({ createParentPath: true }),
  filePayloadExists,
  fileSizeLimitter,
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
