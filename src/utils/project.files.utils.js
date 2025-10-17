import BaseService from './base.service.js'

export default class ProjectFileService extends BaseService {
  constructor() {
    super('/api/project/files')
  }

  async fetchFilePath(projectId) {
    const res = await this.fetch.get(`${this.base_route}/${projectId}`)
    if (res.status === 404) return { success: false, message: 'File not found' }
    return this.handleResponse(res, 'Failed to fetch file path')
  }

  async uploadFile(projectId, file) {
    const formData = new FormData()
    formData.append('file', file)

    const res = await this.fetch.post(`${this.base_route}/${projectId}`, formData)
    return this.handleResponse(res, 'Failed to upload file')
  }

  async deleteFile(fileId) {
    const res = await this.fetch.delete(`${this.base_route}/`, { id: fileId })
    return this.handleResponse(res, 'Failed to delete file')
  }

  async downloadFile(filename) {
    const res = await this.fetch.get(`${this.base_route}/${filename}`)
    if (!res.ok) throw new Error('Failed to download file')

    const blob = await res.blob()
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(link.href)
  }
}
