import TaskService from '../services/task.service.js'
const taskServ = new TaskService()
export default class TaskController{
    createTask = async (req, res, next) => {
        try {
            const task = await taskServ.createTask(req)
            res.status(201).json(task)
        } catch (err) {
            next(err)
        }
    }

    getTaskById = async (req, res, next) => {
        try {
            const task = await taskServ.getTaskById(req)
            res.status(200).json(task)
        } catch (err) {
            next(err)
        }
    }

    getAllTasks = async (req, res, next) => {
        try {
            const tasks = await taskServ.getTasks(req)
            res.status(200).json(tasks)
        } catch (err) {
            next(err)
        }
    }

    updateTask = async (req, res, next) => {
        try {
            const updated = await taskServ.updateTask(req)
            res.status(200).json(updated)
        } catch (err) {
            next(err)
        }
    }

    deleteTask = async (req, res, next) => {
        try {
            const {message, success} = await taskServ.deleteTask(req)
            res.status(200).json({ message, success })
        } catch (err) {
            next(err)
        }
    }

    updateTaskStatus = async (req, res, next) => {
        const { status } = req.query;
        let result

        try {
            switch (status) {
                case 'complete':
                    result = await taskServ.markTaskComplete(req)
                    res.status(200).json({ message: 'Complete task updated', result })
                    break
                case 'busy':
                    result = await taskServ.markTaskBusy(req)
                    res.status(200).json({ message: 'Busy task updated', result })
                    break
                case 'todo':
                    result = await taskServ.markTaskToDo(req)
                    res.status(200).json({ message: 'Task to do updated', result })
                    break
                case 'overdue':
                    result = await taskServ.updateOverdueTasks(req)
                    res.status(200).json({ message: 'Overdue tasks updated', result })
                    break
                default:
                    res.status(400).json({ message: 'Invalid status' });
            }
        } catch (error) {
            next(error)
        }
    }

    getTasksByProject = async (req, res, next) => {
        try {
            const tasks = await taskServ.getTasksByProject(req)
            res.status(200).json(tasks)
        } catch (err) {
            next(err)
        }
    }
}