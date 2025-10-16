// routes/client.route.js
import express from "express";
import clientsController from "../../controllers/client.controller.js";
import projectsController from "../../controllers/projects.controller.js";
import TaskController from '../../controllers/task.controller.js';
import clientAuth from "../../middleware/client.auth.middleware.js";
import { validateGetProject } from "../../validations/project.validation.js";
import { validateGetTaskByProject, validateTaskId } from "../../validations/task.validation.js";

const loggedClientRouter = express.Router();
const taskController = new TaskController();
const projectControl = new projectsController();

loggedClientRouter.get('/task/:projectId', validateGetTaskByProject, clientAuth, taskController.getTasksByProject);

loggedClientRouter.get('/project/:id', validateGetProject, clientAuth, projectControl.getProject);

export default loggedClientRouter;