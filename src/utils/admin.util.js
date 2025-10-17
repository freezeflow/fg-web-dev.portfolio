import BaseService from './base.service.js'

export default class AdminService extends BaseService {
  constructor() {
    super('/api/admin')
  }

  async getAdmin() {
    const res = await this.fetch.get(`${this.base_route}/`)
    return this.handleResponse(res, 'Failed to fetch admin')
  }

  async updateAdmin(form) {
    const res = await this.fetch.put(`${this.base_route}/`, form)
    return this.handleResponse(res, 'Failed to update profile')
  }

  async changePassword(form) {
    const res = await this.fetch.put(`${this.base_route}/password/`, form)
    return this.handleResponse(res, 'Failed to update password')
  }
}
