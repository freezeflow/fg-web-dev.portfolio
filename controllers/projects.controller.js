import projectServices from "../services/projects.services.js"
const projectServ = new projectServices()

export default class projectsController{
    createProject = async (req, res, next) => {
        try {
            // Call createProjects function
            const newProject = await projectServ.createProjects(req)

            // Send response
            res.status(201).json({success: true, project: newProject})
        } catch (error) {
            next(error)
        }
        
    };

    getProject = async (req, res, next) => {
        try {
            // Call getProject function from project services class
            const foundProject = await projectServ.getProject(req);

            // Send response
            res.status(200).json({success: true, foundProject});
        } catch (error) {
            next(error);
        }
        
    };

    updateProject = async (req, res, next) => {
        try {
            // Call updateProject function from project services class
            const updatedProject = await projectServ.updateProject(req);

            // Send response
            res.status(200).json({ success: true, updatedProject });
        } catch (error) {
            next(error);
        }
    };

    toggleFeatured = async (req, res, next) => {
        try {
            const updatedProject = await projectService.toggleFeaturedProject(req);
            res.status(200).json(updatedProject);
        } catch (err) {
            next(err);
        }
    };

    deleteProject = async (req, res, next) => {
        try {
            // Call deleteProject function from project services class
            const result = await projectServ.deleteProject(req);

            // Send response
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    getAllProjects = async (req, res, next) => {
        try {
            // Call getAllProjects function from project services class
            const projects = await projectServ.getAllProjects(req);

            // Send response
            res.status(200).json({ success: true, projects });
        } catch (error) {
            next(error);
        }
    };

    getFeatured = async (req, res, next) => {
        try {
            const featuredProjects = await projectServ.getFeaturedProjects(req);
            res.status(200).json({Projects: featuredProjects});
        } catch (err) {
            next(err);
        }
    };

    sendCompletedEmail = async (req, res, next) => {
        try {
            const result = await projectServ.sendEmail(req);
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }
}