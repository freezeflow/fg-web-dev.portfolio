import BaseService from './base.service.js'

export default class ClientFileService extends BaseService {
  constructor() {
    super('/api/client/files')
  }

  async uploadFile(clientId, fileData) {
    const res = await this.fetch.post(`${this.base_route}/${clientId}`, fileData)
    return this.handleResponse(res, 'Failed to upload file')
  }

  async getFilesByClient(clientId) {
    const res = await this.fetch.get(`${this.base_route}/${clientId}`)
    const data = await this.handleResponse(res, 'Failed to fetch client files')
    return data.files || []
  }

  async deleteFile(fileId) {
    const res = await this.fetch.delete(`${this.base_route}/${fileId}`)
    return this.handleResponse(res, 'Failed to delete client file')
  }

  async downloadFile(filename) {
    const res = await this.fetch.get(`${this.base_route}/download/${filename}`)
    const { url, filename: serverFilename } = await this.handleResponse(res)

    const fileRes = await fetch(url)
    if (!fileRes.ok) throw new Error('Failed to fetch file from Cloudinary')

    const blob = await fileRes.blob()
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = serverFilename || filename
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(link.href)
  }
}
