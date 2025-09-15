import express from 'express'
import TaskController from '../controllers/task.controller.js'
import authenticate from '../middleware/auth.middleware.js'
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

taskRouter.post('/', validateCreateTask, authenticate, taskController.createTask)

taskRouter.get('/', validateGetAllTasks, authenticate, taskController.getAllTasks)

taskRouter.patch('/update/status/:id', validateUpdateStatus, authenticate, taskController.updateTaskStatus)

taskRouter.get('/project/:projectId', validateGetTaskByProject, authenticate, taskController.getTasksByProject)

taskRouter.get('/:id', validateTaskId, authenticate, taskController.getTaskById)

taskRouter.patch('/:id', validateUpdateTask, authenticate, taskController.updateTask)

taskRouter.delete('/:id', validateTaskId, authenticate, taskController.deleteTask)

export default taskRouter
