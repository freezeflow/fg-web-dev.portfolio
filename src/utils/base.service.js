import fetchApi from './fetch.util.js'

export default class BaseService {
  constructor(base_route) {
    this.base_route = `${import.meta.env.VITE_API_URL}${base_route}`
    this.fetch = new fetchApi(true)
  }

  /**
   * Safely parse an error message from the backend response.
   */
  async extractErrorMessage(res) {
    try {
      const data = await res.json()
      return data.message || 'An unknown error occurred'
    } catch {
      return `Request failed with status ${res.status}`
    }
  }

  /**
   * Handle fetch responses in a consistent way.
   */
  async handleResponse(res, customMessage = 'Request failed') {
    if (!res.ok) throw new Error(await this.extractErrorMessage(res))
    try {
      return await res.json()
    } catch {
      throw new Error(customMessage)
    }
  }
}
