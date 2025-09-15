import RefreshHandler from './refresh.util.js'

export class ProjectService extends  RefreshHandler{
  constructor() {
    super('http://localhost:8080/api/projects')
  }

  async getAllProjects() {
    const res = await this.withRefreshRetry(() =>
      this.fetch.get(`${this.base_route}/`)
    )
    if (!res.ok) {
      throw new Error('Failed to fetch projects')
    }

    const data = await res.json()
    return  data.projects
  }

  async getProject(id) {
    const res = await this.withRefreshRetry(() =>
      this.fetch.get(`${this.base_route}/${id}`)
    )
    if (!res.ok) {
      throw new Error('Failed to fetch project')
    }

    return await res.json()
  }

  async getFeaturedProjects(){
    const res = await this.withRefreshRetry(() =>
      this.fetch.get(`${this.base_route}/featured?fields=title summary`)
    )
    if (!res.ok) {
      throw new Error('Failed to fetch project')
    }

    return await res.json()
  }

  async createProject(formData) {
    const res = await this.withRefreshRetry(() =>
      this.fetch.post(`${this.base_route}/create`, formData)
    )
    if (!res.ok) {
      throw new Error('Failed to create project')
    }

    return await res.json()
  }

  async deleteProject(id) {
    const res = await this.withRefreshRetry(() =>
      this.fetch.delete(`${this.base_route}/${id}`)
    )
    if (!res.ok) {
      throw new Error('Failed to delete project')
    }

    return await res.json()
  }

  async updateProject(id, updatedData) {
    const res = await this.withRefreshRetry(() =>
      this.fetch.put(`${this.base_route}/${id}`, updatedData)
    )
    if (!res.ok) {
      throw new Error('Failed to update project')
    }

    return await res.json()
  }

  async sendEmail(form){
    const res = await this.withRefreshRetry(() =>
      this.fetch.post(`${this.base_route}/email`, form)
    )
    if (!res.ok) {
      throw new Error('Failed to send email')
    }

    return await res.json()
  }
}
