import BaseService from './base.service.js'

export default class FeaturedProjectService extends BaseService {
  constructor() {
    super('/api/featured')
  }

  async getAllFeaturedProjects() {
    const res = await this.fetch.get(`${this.base_route}`)
    const data = await this.handleResponse(res, 'Failed to fetch featured projects')
    return data.featuredList || []
  }

  async createFeaturedProject(formData) {
    const res = await this.fetch.post(`${this.base_route}/`, formData)
    return this.handleResponse(res, 'Failed to create featured project')
  }

  // async getFeaturedProject(id) {
  //   const res = await this.fetch.get(`${this.base_route}/${id}`)
  //   const data = await this.handleResponse(res, 'Failed to fetch featured project')
  //   return data.project
  // }

  // async updateFeaturedProject(id, data) {
  //   const res = await this.fetch.patch(`${this.base_route}/${id}`, data)
  //   return this.handleResponse(res, 'Failed to update featured project')
  // }

  // async deleteFeaturedProject(id) {
  //   const res = await this.fetch.delete(`${this.base_route}/${id}`)
  //   return this.handleResponse(res, 'Failed to delete featured project')
  // }
}
