import ClientFile from "../models/client.files.model.js";
import AppError from "../utils/app.error.class.js";
import { v2 as cloudinary } from "cloudinary";

export default class clientFileServices {

  // CREATE FILE
  createClientFile = async (req) => {
    try {
      const clientId = req.params.id;

      if (!req.file) {
        throw new AppError({ message: "No file uploaded", status: 400 });
      }

      const { originalname, mimetype, path, filename } = req.file;

      // filename from multer = public_id
      const public_id = filename;

      // extract version from URL
      const versionMatch = path.match(/\/v(\d+)\//);
      const version = versionMatch ? versionMatch[1] : null;

      // Save in DB
      const newClientFile = await ClientFile.create({
        client: clientId,
        filePath: public_id,
        fileName: originalname, 
        fileType: mimetype,
        version: version,
        note: req.body.note || "",
      });

      if (!newClientFile) {
        throw new AppError({ message: "Client file not created", status: 500 });
      }

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
      const fileDoc = await ClientFile.findOne({ fileName: filename });

      if (!fileDoc) {
        throw new AppError({ message: "File not found", status: 404 });
      }

      // Generate signed URL
      const signedUrl = cloudinary.url(fileDoc.filePath, {
        resource_type: "raw",
        sign_url: true,
        expires_at: Math.floor(Date.now() / 1000) + 60,
        flags: 'attachment'
      });

      return { url: signedUrl, filename: fileDoc.fileName };
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

      // Delete from Cloudinary
      const cloudRes = await cloudinary.uploader.destroy(clientFile.filePath, {resource_type: "raw"});

      if (cloudRes.result === "ok") {
        await ClientFile.findByIdAndDelete(fileId);
        return { message: "File deleted successfully", clientFile };
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
