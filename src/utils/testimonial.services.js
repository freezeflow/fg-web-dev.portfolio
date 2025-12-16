import BaseService from './base.service.js'

export default class TestimonialServices extends BaseService {
  constructor() {
    super('/api/testimonial')
  }

  async getTestimonial(id) {
    const res = await this.fetch.get(`${this.base_route}/${id}`)
    return this.handleResponse(res, 'Failed to fetch testimonial')
  }

  async createTestimonial(formData) {
    const res = await this.fetch.post(`${this.base_route}/`, formData)
    return this.handleResponse(res, 'Failed to create testimonial')
  }

  async deleteTestimonial(id) {
    const res = await this.fetch.delete(`${this.base_route}/${id}`)
    return this.handleResponse(res, 'Failed to delete testimonial')
  }

  async updateTestimonial(id, form) {
    const res = await this.fetch.patch(`${this.base_route}/${id}`, form)
    return this.handleResponse(res, 'Failed to update testimonial')
  }
}
