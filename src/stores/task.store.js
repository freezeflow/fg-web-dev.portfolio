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
    async handleRequest(fn, ...args) {
      this.loading = true
      this.error = null
      try {
        return await fn(...args)
      } catch (err) {
        this.error = err instanceof Error ? err : new Error(String(err))
        throw this.error
      } finally {
        this.loading = false
      }
    },

    toKeyedObject(array) {
      return Object.fromEntries(array.map(item => [item._id, item]))
    },

    async fetchTasksByStatus(status) {
      const query = JSON.stringify({ status })
      const fetched = await this.handleRequest(taskService.getTasks.bind(taskService), query)
      this.tasksByStatus[status] = this.toKeyedObject(fetched)
      localStorage.setItem(`${status}`, JSON.stringify(this.tasksByStatus[status]))
    },

    async fetchAllTasks(projectId) {
      const fetched = await this.handleRequest(taskService.getAllTasks.bind(taskService), projectId)
      const statuses = Object.keys(this.tasksByStatus)

      for (const status of statuses) {
        const filtered = fetched.filter(task => task.status === status)
        const keyed = this.toKeyedObject(filtered)
        this.tasksByStatus[status] = keyed
        localStorage.setItem(`${projectId}${status}Tasks`, JSON.stringify(keyed))
      }

      return this.tasksByStatus
    },

    loadTasks(projectId) {
      const statuses = Object.keys(this.tasksByStatus)
      const missing = []

      for (const status of statuses) {
        const stored = localStorage.getItem(`${projectId}${status}Tasks`)
        if (stored) {
          try {
            this.tasksByStatus[status] = JSON.parse(stored)
          } catch {
            missing.push(status)
          }
        } else {
          missing.push(status)
        }
      }

      if (missing.length) {
        this.error = `No tasks found for: ${missing.join(', ')}`
      }
    },

    async createTask(formData) {
      const newTask = await this.handleRequest(taskService.createTask.bind(taskService), formData)
      const status = newTask.status || 'staged'
      this.tasksByStatus[status][newTask._id] = newTask
      localStorage.setItem(`${formData.projectId}${status}Tasks`, JSON.stringify(this.tasksByStatus[status]))
      this.selectedTask = newTask
      return newTask
    },

    async updateTask(id, updates) {
      const updated = await this.handleRequest(taskService.updateTask.bind(taskService), id, updates)
      this.removeTaskFromAllStatuses(id)
      const status = updated.status || 'staged'
      this.tasksByStatus[status][id] = updated
      return updated
    },

    async changeStatus(id, oldStatus, newStatus, projectId) {
      const updatedTask = await this.handleRequest(taskService.updateStatus.bind(taskService), id, newStatus)
      this.removeTask(projectId, oldStatus, id)
      this.tasksByStatus[newStatus][id] = updatedTask.result
      localStorage.setItem(`${projectId}${newStatus}Tasks`, JSON.stringify(this.tasksByStatus[newStatus]))
      return updatedTask
    },

    async deleteTask(projectId, status, taskId) {
      await this.handleRequest(taskService.deleteTask.bind(taskService), taskId)
      this.removeTask(projectId, status, taskId)
    },

    removeTask(projectId, status, taskId) {
      const key = `${projectId}${status}Tasks`
      const stored = localStorage.getItem(key)
      if (!stored) return

      try {
        const tasksObj = JSON.parse(stored)
        if (tasksObj[taskId]) {
          delete tasksObj[taskId]
          localStorage.setItem(key, JSON.stringify(tasksObj))
          this.tasksByStatus[status] = tasksObj
        }
      } catch (e) {
        console.error('Failed to remove task:', e)
      }
    },

    removeTaskFromAllStatuses(id) {
      for (const status of Object.keys(this.tasksByStatus)) {
        if (this.tasksByStatus[status][id]) {
          delete this.tasksByStatus[status][id]
        }
      }
    },

    clearTaskStorage(projectId) {
      const statuses = Object.keys(this.tasksByStatus)
      statuses.forEach(status => localStorage.removeItem(`${projectId}${status}Tasks`))
    }
  }
})
