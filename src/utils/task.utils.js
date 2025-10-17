import BaseService from './base.service.js'

export default class TaskService extends BaseService {
  constructor() {
    super('/api/tasks')
  }

  async getTask(id) {
    const res = await this.fetch.get(`${this.base_route}/${id}`)
    return this.handleResponse(res, 'Failed to fetch task')
  }

  async getAllTasks(projectId) {
    const res = await this.fetch.get(`${this.base_route}/project/${projectId}`)
    return this.handleResponse(res, 'Failed to fetch tasks')
  }

  async getTasks(query) {
    const res = await this.fetch.get(`${this.base_route}/?filter=${encodeURIComponent(query)}`)
    return this.handleResponse(res, `Failed to fetch ${query} tasks`)
  }

  async createTask(formData) {
    const res = await this.fetch.post(`${this.base_route}/`, formData)
    return this.handleResponse(res, 'Failed to create task')
  }

  async deleteTask(id) {
    const res = await this.fetch.delete(`${this.base_route}/${id}`)
    return this.handleResponse(res, 'Failed to delete task')
  }

  async updateTask(id, updatedData) {
    const res = await this.fetch.patch(`${this.base_route}/${id}`, updatedData)
    return this.handleResponse(res, 'Failed to update task')
  }

  async updateStatus(id, status) {
    const res = await this.fetch.patch(`${this.base_route}/update/status/${id}?status=${status}`)
    return this.handleResponse(res, `Failed to update task status to "${status}"`)
  }

  async markAsComplete(id) {
    return this.updateStatus(id, 'complete')
  }

  async markAsToDo(id) {
    return this.updateStatus(id, 'todo')
  }

  async markAsBusy(id) {
    return this.updateStatus(id, 'busy')
  }

  async markAsOverdue(id) {
    return this.updateStatus(id, 'overdue')
  }
}
