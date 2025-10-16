import express from 'express'
import TaskController from '../controllers/task.controller.js'
import {authenticate, authorizeRole} from '../middleware/auth.middleware.js'
import { 
    validateCreateTask, 
    validateGetAllTasks, 
    validateGetTaskByProject, 
    validateTaskId, 
    validateUpdateStatus,
    validateUpdateTask
} from '../validations/task.validation.js';

const taskController = new TaskController();
const taskRouter = express.Router();

taskRouter.post('/', validateCreateTask, authenticate, authorizeRole('admin'), taskController.createTask)

taskRouter.get('/', validateGetAllTasks, authenticate, authorizeRole('admin'), taskController.getAllTasks)

taskRouter.patch('/update/status/:id', validateUpdateStatus, authenticate, authorizeRole('admin'), taskController.updateTaskStatus)

taskRouter.get('/project/:projectId', validateGetTaskByProject, authenticate, authorizeRole('admin', 'client'), taskController.getTasksByProject)

taskRouter.get('/:id', validateTaskId, authenticate, authorizeRole('admin'), taskController.getTaskById)

taskRouter.patch('/:id', validateUpdateTask, authenticate, authorizeRole('admin'), taskController.updateTask)

taskRouter.delete('/:id', validateTaskId, authenticate, authorizeRole('admin'), taskController.deleteTask)

export default taskRouter
