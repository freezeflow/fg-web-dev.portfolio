import RefreshHandler from './refresh.util.js'

export default class ProjectFileService extends RefreshHandler {
  constructor() {
    super('/api/project/files')
  }

  async fetchFilePath(projectId) {
    const res = await this.withRefreshRetry(() =>
      this.fetch.get(`${this.base_route}/${projectId}`)
    )

    if (res.status === 404) return { success: false, message: 'File not found' }
    if (!res.ok) throw new Error('Failed to fetch file path')
    return await res.json()
  }

  async uploadFile(projectId, file) {
    const formData = new FormData()
    formData.append('file', file)

    const res = await this.withRefreshRetry(() =>
      this.fetch.post(`${this.base_route}/${projectId}`, formData)
    )

    if (!res.ok) throw new Error('Failed to upload file')
    return await res.json()
  }

  async deleteFile(fileId) {
    const res = await this.withRefreshRetry(() =>
      this.fetch.delete(`${this.base_route}/`, { id: fileId })
    )

    if (!res.ok) throw new Error('Failed to delete file')
    return await res.json()
  }

  async downloadFile(filename) {
    const res = await this.withRefreshRetry(() =>
      this.fetch.get(`${this.base_route}/${filename}`)
    )

    if (!res.ok) throw new Error('Failed to download file')

    const blob = await res.blob()
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
}
