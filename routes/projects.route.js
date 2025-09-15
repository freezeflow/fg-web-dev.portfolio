import { Router } from "express";
import authenticate from '../middleware/auth.middleware.js'
import projectsController from "../controllers/projects.controller.js";
import { 
    validateCreateProject, 
    validateId, 
    validateUpdateProject,
    validateGetProjects,
    validateGetProject,
    validateSendEmail
} from "../validations/project.validation.js";

const projectRoutes = Router()
const projectControl = new projectsController()

// Create project
projectRoutes.post('/create', validateCreateProject, authenticate, projectControl.createProject);

// Toggle featured project
projectRoutes.patch("/:id/toggle-featured", validateId, authenticate, projectControl.toggleFeatured);

// Update project
projectRoutes.put('/:id', validateUpdateProject, authenticate, projectControl.updateProject);

// Send email to client on project completion
projectRoutes.post('/email', validateSendEmail, authenticate, projectControl.sendCompletedEmail);

// Get all projects
projectRoutes.get('/', validateGetProjects, authenticate, projectControl.getAllProjects);

// Get all featured projects
projectRoutes.get("/featured", validateGetProjects, projectControl.getFeatured);

// Get project by id
projectRoutes.get('/:id', validateGetProject, authenticate, projectControl.getProject);

// Delete project by id
projectRoutes.delete('/:id', validateId, authenticate, projectControl.deleteProject);

export default projectRoutes;