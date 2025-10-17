import { defineStore } from 'pinia'
import { ProjectService } from '@/utils/project.util.js'
import router from '@/router'

const projectService = new ProjectService()

export const useProjectStore = defineStore('projects', {
  state: () => ({
    projects: [],
    selectedProject: null,
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

    async getAllProjects() {
      this.projects = await this.handleRequest(projectService.getAllProjects.bind(projectService))
    },

    async getProject(id, url) {
      const data = await this.handleRequest(projectService.getProject.bind(projectService), id)
      this.selectedProject = data?.foundProject || null
      if (this.selectedProject) {
        localStorage.setItem('selectedProject', JSON.stringify(this.selectedProject))
        if (url) router.push(url)
      }
      return this.selectedProject
    },

    async getProjects(ids = [], storeInLocalStorage = true) {
      const results = await this.handleRequest(async () => {
        const promises = ids.map(id => projectService.getProject(id))
        return Promise.all(promises)
      })

      const validProjects = results
        .map(res => res?.foundProject)
        .filter(Boolean)

      if (storeInLocalStorage) {
        localStorage.setItem('selectedProjects', JSON.stringify(validProjects))
      }

      return validProjects
    },

    async getFeaturedProjects() {
      const res = await this.handleRequest(projectService.getFeaturedProjects.bind(projectService))
      this.projects = res?.Projects || []
    },

    async createProject(formData) {
      const data = await this.handleRequest(projectService.createProject.bind(projectService), formData)
      if (data?.project) this.projects.push(data.project)
      return data
    },

    async deleteProject(id) {
      await this.handleRequest(projectService.deleteProject.bind(projectService), id)
      this.projects = this.projects.filter(p => p._id !== id)
      if (this.selectedProject?._id === id) {
        this.selectedProject = null
        localStorage.removeItem('selectedProject')
      }
    },

    async updateProject(id, updatedData) {
      const updated = await this.handleRequest(projectService.updateProject.bind(projectService), id, updatedData)

      this.projects = this.projects.map(p => p._id === id ? updated?.updatedProject : p)
      if (this.selectedProject?._id === id && updated?.updatedProject) {
        this.selectedProject = updated.updatedProject
        localStorage.setItem('selectedProject', JSON.stringify(this.selectedProject))
      }
    },

    async sendEmail(form) {
      await this.handleRequest(projectService.sendEmail.bind(projectService), form)
    },
  },
})
