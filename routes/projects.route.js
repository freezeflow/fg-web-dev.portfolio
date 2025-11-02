import { Router } from "express";
import {authenticate, authorizeRole} from '../middleware/auth.middleware.js'
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
projectRoutes.post('/create', validateCreateProject, authenticate, authorizeRole('admin'), projectControl.createProject);

// Toggle featured project
projectRoutes.patch("/:id/toggle-featured", validateId, authenticate, authorizeRole('admin'), projectControl.toggleFeatured);

// Update project
projectRoutes.put('/:id', validateUpdateProject, authenticate, authorizeRole('admin'), projectControl.updateProject);

// Send email to client on project completion
projectRoutes.post('/email', validateSendEmail, authenticate, authorizeRole('admin'), projectControl.sendCompletedEmail);

// Get all projects
projectRoutes.get('/', validateGetProjects, authenticate, authorizeRole('admin'), projectControl.getAllProjects);

// Get all featured projects
projectRoutes.get("/featured", validateGetProjects, authenticate, authorizeRole('admin'), projectControl.getFeatured);

// Get project by id
projectRoutes.get('/:id', validateGetProject, authenticate, authorizeRole('admin', 'client'), projectControl.getProject);

// Delete project by id
projectRoutes.delete('/:id', validateId, authenticate, authorizeRole('admin'), projectControl.deleteProject);

export default projectRoutes;