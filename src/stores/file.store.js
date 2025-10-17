import { defineStore } from 'pinia'
import ProjectFileService from '@/utils/project.files.utils'

const fileService = new ProjectFileService()

export const useProjectFileStore = defineStore('projectFiles', {
  state: () => ({
    files: [],
    loading: false,
    error: null,
  }),

  actions: {
    async handleRequest(fn, ...args) {
      this.loading = true
      this.error = null
      try {
        return await fn(...args)
      } catch (err) {
        this.error = err instanceof Error ? err : new Error(String(err))
        throw this.error
      } finally {
        this.loading = false
      }
    },

    async uploadFile(projectId, file) {
      const uploaded = await this.handleRequest(fileService.uploadFile.bind(fileService), projectId, file)
      // Update state assuming returned object has `file` key
      if (uploaded.file) this.files.push(uploaded.file)
      return uploaded
    },

    async fetchFilePath(projectId) {
      const res = await this.handleRequest(fileService.fetchFilePath.bind(fileService), projectId)
      return res?.filePath || null
    },

    async deleteFile(fileId) {
      const res = await this.handleRequest(fileService.deleteFile.bind(fileService), fileId)
      this.files = this.files.filter(f => f._id !== fileId)
      return res
    },

    async downloadFile(filename) {
      await this.handleRequest(fileService.downloadFile.bind(fileService), filename)
    }
  }
})
