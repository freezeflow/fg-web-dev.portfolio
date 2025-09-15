import { defineStore } from 'pinia'
import TaskService from '@/utils/task.utils'

const taskService = new TaskService()

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasksByStatus: {
      staged: {},
      busy: {},
      complete: {},
      todo: {},
      overdue: {}
    },
    selectedTask: null,
    loading: false,
    error: null
  }),

  actions: {
    // Utility: Convert array to keyed object by _id
    toKeyedObject(array) {
      return Object.fromEntries(array.map(item => [item._id, item]))
    },

    // Fetch tasks by status dynamically
    async fetchTasksByStatus(status) {
      this.loading = true
      this.error = null
      const query = JSON.stringify({ status })

      try {
        const fetched = await taskService.getTasks(query)
        this.tasksByStatus[status] = this.toKeyedObject(fetched)
        localStorage.setItem(`${status}`, JSON.stringify(this.tasksByStatus[status]))
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    // Get all tasks
    async fetchAllTasks(projectId) {
      this.loading = true
      this.error = null

      try {
        const statuses = Object.keys(this.tasksByStatus)
        let projectTasks = {}

        // 3. Otherwise, fetch from DB
        const fetched = await taskService.getAllTasks(projectId)

        for (const status of statuses) {
          const filtered = fetched.filter(task => task.status === status)
          const keyed = this.toKeyedObject(filtered)

          this.tasksByStatus[status] = keyed
          projectTasks[status] = keyed

          // store with project-specific key
          localStorage.setItem(`${projectId}${status}Tasks`, JSON.stringify(keyed))
        }

        return projectTasks
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    loadTasks(projectId) {
      this.loading = true
      this.error = ''
      const statuses = Object.keys(this.tasksByStatus)
      const missing = []

      for (const status of statuses) {
        const stored = localStorage.getItem(`${projectId}${status}Tasks`)
        if (stored) {
          try {
            this.tasksByStatus[status] = JSON.parse(stored)
          } catch (e) {
            missing.push(status) // corrupted data counts as missing
          }
        } else {
          missing.push(status)
        }
      }

      // now that all statuses are processed
      this.loading = false

      if (missing.length > 0) {
        this.error = `No tasks found for: ${missing.join(', ')}`
      }
    },

    // Get all relevant statuses
    async fetchAllTaskGroups() {
      const statuses = Object.keys(this.tasksByStatus)
      for (const status of statuses) {
        await this.fetchTasksByStatus(status)
      }
    },

    // Create new task
    async createTask(formData) {
      this.loading = true
      this.error = null

      try {
        const newTask = await taskService.createTask(formData)
        const status = newTask.status || 'staged'
        this.tasksByStatus[status][newTask._id] = newTask
        localStorage.setItem(`${formData.projectId}${status}Tasks`, JSON.stringify(this.tasksByStatus[status]))
        this.selectedTask = newTask
        return newTask
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // Update existing task
    async updateTask(id, updates) {
      this.loading = true
      this.error = null

      try {
        const updated = await taskService.updateTask(id, updates)
        // Remove from all buckets
        this.removeTaskFromAllStatuses(id)
        // Add to current status group
        const status = updated.status || 'staged'
        this.tasksByStatus[status][id] = updated
        return updated
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // Change task status manually (e.g., drag/drop)
    async changeStatus(id, oldStatus, newStatus, projectId) {
      this.loading = true
      this.error = null

      try {
        const updatedTask = await taskService.updateStatus(id, newStatus)
        this.removeTask(projectId, oldStatus, id)
        this.tasksByStatus[newStatus][id] = updatedTask.result
        localStorage.setItem(`${projectId}${newStatus}Tasks`, JSON.stringify(this.tasksByStatus[newStatus]))
        return updatedTask
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // Delete a task
    async deleteTask(projectId, status, taskId) {
      this.loading = true
      this.error = null

      try {
        await taskService.deleteTask(taskId)
        this.removeTask(projectId, status, taskId)
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // Utility to remove task from all status buckets
    // removeTaskFromAllStatuses(id) {
    //   for (const status of Object.keys(this.tasksByStatus)) {
    //     if (this.tasksByStatus[status][id]) {
    //       delete this.tasksByStatus[status][id]
    //       localStorage.setItem(`${status}Tasks`, JSON.stringify(this.tasksByStatus[status]))
    //     }
    //   }
    // },

    removeTask(projectId, status, taskId) {
      const key = `${projectId}${status}Tasks`
      const stored = localStorage.getItem(key)

      if (!stored) return

      try {
        const tasksObj = JSON.parse(stored) // this is an object, not an array
        if (tasksObj[taskId]) {
          delete tasksObj[taskId] // remove by id
          localStorage.setItem(key, JSON.stringify(tasksObj))
          this.tasksByStatus[status] = tasksObj
        }
      } catch (e) {
        console.error("Failed to remove task:", e)
      }
    },

    clearTaskStorage (projectId) {
      
      const statuses = ['todo', 'busy', 'complete', 'overdue', 'staged'];
      statuses.forEach(status => localStorage.removeItem(`${projectId}${status}Tasks`));
    }
  }
})
