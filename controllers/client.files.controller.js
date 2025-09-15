import clientFileServices from "../services/client.file.services.js";
const clientFileServ = new clientFileServices();

export default class clientFileController {
  // Upload a file for a client (POST /api/clients/:id/files)
  uploadClientFile = async (req, res, next) => {
    try {
      const newFile = await clientFileServ.createClientFile(req);
      res.status(201).json({ success: true, file: newFile });
    } catch (error) {
      next(error);
    }
  };

  // Get files for a client (GET /api/clients/:id/files)
  getClientFiles = async (req, res, next) => {
    try {
      const files = await clientFileServ.getClientFiles(req);
      res.status(200).json({ success: true, files });
    } catch (error) {
      next(error);
    }
  };

  // Download a file by filename (GET /api/clients/files/download/:filename)
  downloadClientFile = async (req, res, next) => {
    try {
      const { filePath, filename } = await clientFileServ.downloadFile(req);
      // Use express res.download to send file
      res.download(filePath, filename);
    } catch (error) {
      next(error);
    }
  };

  // Delete a client file (DELETE /api/clients/files) - expects { id } in body
  deleteClientFile = async (req, res, next) => {
    try {
      const result = await clientFileServ.deleteClientFile(req);
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };
}
