import Task from '../models/task.model.js'
import AppError from '../utils/app.error.class.js'
import { toObjectId } from '../utils/mongoose.utils.js';

export default class TaskService {

    // Create a new task
    async createTask(req) {
        // Get task data
        const {title, description, dueDate, projectId} = req.body

        try {
            // Check if task is already in database
            const existingTask = await Task.findOne({
                title: new RegExp(`^${title}$`, 'i'),
                description: new RegExp(`^${description}$`, 'i'),
                projectId: projectId
            });


            // Return the existing task instead of making a duplicate
            if(existingTask) return 'Task already exists'

            // Create new task
             const newTask = await Task.create({
                title,
                description,
                dueDate,
                projectId: projectId,
                status: 'staged'
            });

            // Throw erro if task is not created
            if(!newTask) throw new AppError({message: "Task not created", status: 500})
            
            // Return new task
            return newTask
        } catch (error) {
            throw error
        }
    }

    // Get a single task by ID
    async getTaskById(req) {
        const taskId = req.params.id

        try {
            // Find task
            const task = await Task.findById(taskId)

            // Throw error if task is not found
            if(!task) throw new AppError({message: 'Task not found', status: 404})
            
            // Return found task
            return task
        } catch (error) {
            throw error
        }
        
    }

    // Get all tasks or filtered by query (status, projectId, etc.)
    async getTasks(req) {
        try {
            // Get filter data
            const { filter } = req.query || {};
            const parsedFilter = filter ? JSON.parse(filter) : {};

            const now = new Date();

            const tasks = await Task.aggregate([
                { $match: parsedFilter },
                {
                    $addFields: {
                        diffFromNow: {
                            $abs: { $subtract: ["$dueDate", now] }
                        }
                    }
                },
                { $sort: { diffFromNow: 1 } },
                {
                    $project: {
                        diffFromNow: 0 // Optional: remove the helper field from results
                    }
                }
            ]);

            // Check if tasks were found
            if(!tasks) throw new AppError({message: 'No tasks were found', status: 404})
            
            return tasks;
        } catch (error) {
            throw error
        }
        
    }

    // Update a task by ID
    async updateTask(req) {
        try {
            // Get task Id
            const tasktId = req.params.id

            // Check if task is in database
            const foundTask = await Task.findById(tasktId)

            if(!foundTask) throw new AppError({message: 'Task not found', status: 404})

            // Get task info
            const {title, description, dueDate} = req.body

            // Update task
            if (title !== undefined) foundTask.title = title;
            if (dueDate !== undefined) foundTask.dueDate = dueDate;
            if (description !== undefined) foundTask.description = description;

            // Save updated task
            await foundTask.save()
            return foundTask
        } catch (error) {
            throw error
        }
    }

    // Delete a task by ID
    async deleteTask(req) {
        try {
            // Get task Id
            const taskId = req.params.id

            // Check if task is in database
            const foundTask = await Task.findById(taskId)

            if(!foundTask) throw new AppError({message: `Task not found. Id: ${taskId}`, status: 404})
            
            // Delete task
            await Task.findByIdAndDelete(taskId)
            return {message: 'Task deleted', success: true}
        } catch (error) {
            throw error
        }
    }

    // Mark a task complete
    async markTaskComplete(req) {
        try {
            // Get task Id
            const taskId = req.params.id

            // Check if task is in database
            const foundTask = await Task.findById(taskId)

            if(!foundTask) throw new AppError({message: 'Task not found', status: 404})

            foundTask.status = 'complete'

            // Save task
            await foundTask.save()
            return foundTask
        } catch (error) {
            throw error
        } 
    }

    // Mark task as busy
    async markTaskBusy(req) {
        try {
            // Get task Id
            const tasktId = req.params.id

            // Check if task is in database
            const foundTask = await Task.findById(tasktId)

            if(!foundTask) throw new AppError({message: 'Task not found', status: 404})

            foundTask.status = 'busy'

            // Save task
            await foundTask.save()
            return foundTask
        } catch (error) {
            throw error
        } 
    }

    // Mark task as todo
    async markTaskToDo(req) {
        try {
            // Get task Id
            const tasktId = req.params.id;

            // Check if task is in database
            const foundTask = await Task.findById(tasktId);

            if(!foundTask) throw new AppError({message: 'Task not found', status: 404});

            foundTask.status = 'todo';

            // Save task
            await foundTask.save();
            return foundTask;
        } catch (error) {
            throw error
        } 
    }

    // Mark overdue tasks
    async updateOverdueTasks(req) {
        try {
            const now = new Date()
            return await Task.updateMany(
                {
                    dueDate: { $lt: now },
                    status: { $nin: ['complete', 'overdue'] }
                },
                { status: 'overdue' }
            )
        } catch (error) {
            throw error
        }
    }

    // Get tasks by projectId
    async getTasksByProject(req) {
        const projectId = req.params.projectId
        const now = new Date();
        try {

            const objectId = toObjectId(projectId);
            const tasks = await Task.aggregate([
                { $match:  { projectId: objectId}},
                {
                    $addFields: {
                        diffFromNow: {
                            $abs: { $subtract: ["$dueDate", now] }
                        }
                    }
                },
                { $sort: { diffFromNow: 1 } },
                {
                    $project: {
                        diffFromNow: 0 // Optional: remove the helper field from results
                    }
                }
            ]);

            // Check if tasks were found
            if(tasks.length === 0) throw new AppError({message: 'Tasks not found', status: 404})
            
            return tasks
        } catch (error) {
            throw error
        } 
    }
}