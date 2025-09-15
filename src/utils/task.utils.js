import RefreshHandler from './refresh.util.js'

export default class TaskService extends RefreshHandler {
  constructor() {
    super('http://localhost:8080/api/tasks')
  }

  async getTask(id) {
    const res = await this.withRefreshRetry(() =>
      this.fetch.get(`${this.base_route}/${id}`)
    )
    if (!res.ok) throw new Error('Failed to fetch task')
    return await res.json()
  }

  async getAllTasks(projectId) {
    const res = await this.withRefreshRetry(() =>
      this.fetch.get(`${this.base_route}/project/${projectId}`)
    )
    if (!res.ok) throw new Error('Failed to fetch tasks')
    return await res.json()
  }

  async getTasks(query) {
    const res = await this.withRefreshRetry(() =>
      this.fetch.get(`${this.base_route}/?filter=${encodeURIComponent(query)}`)
    )
    if (!res.ok) throw new Error(`Failed to fetch ${query} tasks`)
    return await res.json()
  }

  async createTask(formData) {
    const res = await this.withRefreshRetry(() =>
      this.fetch.post(`${this.base_route}/`, formData)
    )
    if (!res.ok) throw new Error('Failed to create task')
    return await res.json()
  }

  async deleteTask(id) {
    const res = await this.withRefreshRetry(() =>
      this.fetch.delete(`${this.base_route}/${id}`)
    )
    if (!res.ok) throw new Error('Failed to delete task')
    return await res.json()
  }

  async updateTask(id, updatedData) {
    const res = await this.withRefreshRetry(() =>
      this.fetch.patch(`${this.base_route}/${id}`, updatedData)
    )
    if (!res.ok) throw new Error('Failed to update task')
    return await res.json()
  }

  async updateStatus(id, status) {
    const res = await this.withRefreshRetry(() =>
      this.fetch.patch(`${this.base_route}/update/status/${id}?status=${status}`)
    )
    if (!res.ok) throw new Error(`Failed to update task status to "${status}"`)
    return await res.json()
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
