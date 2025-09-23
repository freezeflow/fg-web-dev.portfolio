import RefreshHandler from './refresh.util.js'

export default class ClientService extends RefreshHandler {
  constructor() {
    super('/api/client')
  }

  async getAllClients() {
    const res = await this.withRefreshRetry(() =>
      this.fetch.get(`${this.base_route}/`)
    )
    if (!res.ok) throw new Error('Failed to fetch clients')
    const data = await res.json()
    return data.clients
  }

  async getClient(id) {
    const res = await this.withRefreshRetry(() =>
      this.fetch.get(`${this.base_route}/${id}`)
    )
    if (!res.ok) throw new Error('Failed to fetch client')
    const data = await res.json()
    return data.client
  }

  async createClient(data) {
    const res = await this.withRefreshRetry(() =>
      this.fetch.post(`${this.base_route}/`, data)
    )
    if (!res.ok) throw new Error('Failed to create client')
    return await res.json()
  }

  async getClientsByProjectIds(projectIds, fields = '') {
    const queryIds = Array.isArray(projectIds)
      ? projectIds.join(',')
      : projectIds;

    const queryParams = new URLSearchParams({
      projectIds: queryIds
    });

    if (fields) queryParams.append('fields', fields);

    const res = await this.withRefreshRetry(() =>
      this.fetch.get(`${this.base_route}/by-project?${queryParams.toString()}`)
    );

    if (!res.ok) throw new Error('Failed to fetch clients by project IDs');
    const data = await res.json();
    return data.clients;
  }

  async updateClient(id, data) {
    const res = await this.withRefreshRetry(() =>
      this.fetch.patch(`${this.base_route}/${id}`, data)
    )
    if (!res.ok) throw new Error('Failed to update client')
    return await res.json()
  }

  async deleteClient(id) {
    const res = await this.withRefreshRetry(() =>
      this.fetch.delete(`${this.base_route}/${id}`)
    )
    if (!res.ok) throw new Error('Failed to delete client')
    return await res.json()
  }
}
