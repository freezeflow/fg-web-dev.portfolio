import projectFileServices from "../services/project.file.services.js";
const projectFileServ = new projectFileServices()

export default class projectFileController{

    createProjectFile = async (req, res, next) => {
        try {
            // Call createProjectFiles function from project services class
            const newProjectFile = await projectFileServ.createProjectFiles(req);

            // Send response
            res.status(200).json({success: true, newProjectFile});
        } catch (error) {
            next(error);
        }
    }

    getFilepathControl = async (req, res, next) => {
        try {
            // Call getFilepath function from project services class
            const filePath = await projectFileServ.getFilepath(req);

            // Send response
            res.status(200).json({success: true, filePath});
        } catch (error) {
            next(error);
        }
    }

    deleteFile = async (req, res, next) => {
        try {
            // Call deleteFile function
            await projectFileServ.deleteFile(req);

            return res.status(200).json({
                status: 'success',
                message: 'File deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    };
}