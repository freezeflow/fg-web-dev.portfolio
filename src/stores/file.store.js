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
    async uploadFile(projectId, file) {
      this.loading = true
      this.error = null
      try {
        const uploaded = await fileService.uploadFile(projectId, file)
        this.files.push(uploaded.newProjectFile) // assuming `projectFile` key
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchFilePath(projectId) {
      this.loading = true
      this.error = null
      try {
        const res = await fileService.fetchFilePath(projectId)
        return res.filePath
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async deleteFile(fileId) {
      this.loading = true
      this.error = null
      try {
        const res = await fileService.deleteFile(fileId)
        return res
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
})
