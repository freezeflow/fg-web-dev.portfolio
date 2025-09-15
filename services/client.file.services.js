import ClientFile from "../models/client.files.model.js";
import AppError from "../utils/app.error.class.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";

export default class clientFileServices {

  // CREATE FILE
  createClientFile = async (req) => {
    try {
      const clientId = req.params.id;

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      const file = req.files && req.files.file;
      if (!file) throw new AppError({ message: "No file uploaded", status: 400 });

      // Save file to /client-uploads
      const uploadPath = path.join(__dirname, '..', '..', 'client-uploads', file.name);
      await file.mv(uploadPath);

      const dbFilePath = `/client-uploads/${file.name}`;

      // Save in DB
      const newClientFile = await ClientFile.create({
        client: clientId,
        filePath: dbFilePath,
        fileName: file.name,
        fileType: file.mimetype,
        note: req.body.note || ''
      });

      if (!newClientFile) throw new AppError({ message: "Client file not created", status: 500 });

      return newClientFile;
    } catch (error) {
      throw error;
    }
  };

  // GET FILE INFO BY CLIENT ID
  getClientFiles = async (req) => {
    try {
      const clientId = req.params.id;

      const foundFiles = await ClientFile.find({ client: clientId });
      if (!foundFiles || foundFiles.length === 0) {
        throw new AppError({ message: "No files found for this client", status: 404 });
      }

      return foundFiles;
    } catch (error) {
      throw error;
    }
  };

  // DOWNLOAD FILE
  downloadFile = async (req) => {
    try {
      const filename = req.params.filename;

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const FILES_DIR = path.join(__dirname, '..', '..', 'client-uploads');

      const filePath = path.join(FILES_DIR, filename);

      // Prevent directory traversal
      if (path.relative(FILES_DIR, filePath).includes('..')) {
        throw new AppError({ message: "Forbidden", status: 403 });
      }

      await fs.access(filePath, fs.constants.F_OK);

      return { filePath, filename };
    } catch (error) {
      throw error;
    }
  };

  // DELETE FILE
  deleteClientFile = async (req) => {
    try {
      const fileId = req.params.id;

      const clientFile = await ClientFile.findById(fileId);
      if (!clientFile) throw new AppError({ message: "File not found", status: 404 });

      const relativePath = clientFile.filePath;
      if (!relativePath) throw new AppError("File path not found", 404);

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const absolutePath = path.join(__dirname, '..', '..', relativePath);

      // Delete physical file
      try {
        await fs.unlink(absolutePath);
      } catch (err) {
        if (err.code !== 'ENOENT') {
          throw new AppError({ message: "Something went wrong while deleting file", status: 505 });
        }
      }

      // Delete record in DB
      await ClientFile.findByIdAndDelete(fileId);

      return { success: true };
    } catch (error) {
      throw error;
    }
  };
}
