import BaseService from './base.service.js'

export class ProjectService extends BaseService {
  constructor() {
    super('/api/projects')
  }

  async getAllProjects() {
    const res = await this.fetch.get(`${this.base_route}/`)
    const data = await this.handleResponse(res, 'Failed to fetch projects')
    return data.projects || []
  }

  async getProject(id) {
    const res = await this.fetch.get(`${this.base_route}/${id}`)
    return this.handleResponse(res, 'Failed to fetch project')
  }

  async getFeaturedProjects() {
    const res = await this.fetch.get(`${this.base_route}/featured?fields=title,summary`)
    return this.handleResponse(res, 'Failed to fetch featured projects')
  }

  async createProject(formData) {
    const res = await this.fetch.post(`${this.base_route}/create`, formData)
    return this.handleResponse(res, 'Failed to create project')
  }

  async updateProject(id, updatedData) {
    const res = await this.fetch.put(`${this.base_route}/${id}`, updatedData)
    return this.handleResponse(res, 'Failed to update project')
  }

  async deleteProject(id) {
    const res = await this.fetch.delete(`${this.base_route}/${id}`)
    return this.handleResponse(res, 'Failed to delete project')
  }

  async sendEmail(form) {
    const res = await this.fetch.post(`${this.base_route}/email`, form)
    return this.handleResponse(res, 'Failed to send email')
  }
}
