import BaseService from './base.service.js'

export default class AuthService extends BaseService {
  constructor() {
    super('/api/auth')
    this.client_route = `${import.meta.env.VITE_API_URL}/api/client`
  }

  async adminLogin(form) {
    const res = await this.fetch.post(`${this.base_route}/sign-in`, form)
    if (res.status === 404) throw new Error('Invalid password or email')
    return this.handleResponse(res, 'Failed to validate admin')
  }

  async clientLogin(form) {
    const res = await this.fetch.post(`${this.client_route}/sign-in`, form)
    if (res.status === 404) throw new Error('Invalid password or email')
    return this.handleResponse(res, 'Failed to validate client')
  }

  async verifyClientEmail(form) {
    const res = await this.fetch.post(`${this.base_route}/verify`, form)
    return this.handleResponse(res, 'Failed to validate email')
  }

  async resetPin(form) {
    const res = await this.fetch.put(`${this.base_route}/reset/${form.token}`, form)
    return this.handleResponse(res, 'Failed to reset pin')
  }
}
