import BaseService from './base.service.js'

export default class ClientService extends BaseService {
  constructor() {
    super('/api/client')
  }

  async getAllClients() {
    const res = await this.fetch.get(`${this.base_route}/`)
    const data = await this.handleResponse(res, 'Failed to fetch clients')
    return data.clients || []
  }

  async getClient(id) {
    const res = await this.fetch.get(`${this.base_route}/${id}`)
    const data = await this.handleResponse(res, 'Failed to fetch client')
    return data.client
  }

  async createClient(data) {
    const res = await this.fetch.post(`${this.base_route}/`, data)
    return this.handleResponse(res, 'Failed to create client')
  }

  async getClientsByProjectIds(projectIds, fields = '') {
    const queryIds = Array.isArray(projectIds)
      ? projectIds.join(',')
      : projectIds

    const queryParams = new URLSearchParams({ projectIds: queryIds })
    if (fields) queryParams.append('fields', fields)

    const res = await this.fetch.get(
      `${this.base_route}/by-project?${queryParams.toString()}`
    )
    const data = await this.handleResponse(res, 'Failed to fetch clients by project IDs')
    return data.clients || []
  }

  async updateClient(id, data) {
    const res = await this.fetch.patch(`${this.base_route}/${id}`, data)
    return this.handleResponse(res, 'Failed to update client')
  }

  async deleteClient(id) {
    const res = await this.fetch.delete(`${this.base_route}/${id}`)
    return this.handleResponse(res, 'Failed to delete client')
  }
}
