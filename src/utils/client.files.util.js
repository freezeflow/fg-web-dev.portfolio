import RefreshHandler from './refresh.util.js'

export default class ClientFileService extends RefreshHandler {
  constructor() {
    super('/api/client/files')
  }

  async uploadFile(clientId, fileData) {
    const res = await this.withRefreshRetry(() =>
      this.fetch.post(`${this.base_route}/${clientId}`, fileData)
    )
    if (!res.ok) throw new Error('Failed to upload file')
    return await res.json()
  }

  async getFilesByClient(clientId) {
    const res = await this.withRefreshRetry(() =>
      this.fetch.get(`${this.base_route}/${clientId}`)
    )
    if (!res.ok) throw new Error('Failed to fetch client files')
    const data = await res.json()
    return data.files
  }

  async deleteFile(fileId) {
    const res = await this.withRefreshRetry(() =>
      this.fetch.delete(`${this.base_route}/${fileId}`)
    )
    if (!res.ok) throw new Error('Failed to delete client file')
    return await res.json()
  }

  async downloadFile(filename) {
  const res = await this.withRefreshRetry(() =>
    this.fetch.get(`${this.base_route}/download/${filename}`)
  );

  if (!res.ok) throw new Error("Failed to get file URL");

  const { url, filename: serverFilename } = await res.json();

  const fileRes = await fetch(url);
  if (!fileRes.ok) throw new Error("Failed to fetch file from Cloudinary");

  const blob = await fileRes.blob();
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = serverFilename || filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}
}