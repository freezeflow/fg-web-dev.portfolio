import { defineStore } from 'pinia'
import { ProjectService } from '@/utils/project.util.js'
import router from '@/router'

const projectService = new ProjectService()

export const useProjectStore = defineStore('projects', {
  state: () => ({
    projects: [],
    selectedProject: null,
    loading: false,
    error: null
  }),

  actions: {
    async getAllProjects() {
      this.loading = true
      this.error = null
      try {
        this.projects = await projectService.getAllProjects()
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async getProject(id, url) {
      this.loading = true
      this.error = null
      try {
        const data = await projectService.getProject(id)
        this.selectedProject = data.foundProject
        localStorage.setItem('selectedProject', JSON.stringify(this.selectedProject))
        if(this.selectedProject && url) router.push(url)
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async getProjects(ids = [], storeInLocalStorage = true) {
      this.loading = true
      this.error = null

      try {
        const promises = ids.map(id => projectService.getProject(id))
        const results = await Promise.all(promises)

        const validProjects = results
          .map(res => res?.foundProject)
          .filter(Boolean)

        if (storeInLocalStorage) {
          localStorage.setItem('selectedProjects', JSON.stringify(validProjects))
        }

        return validProjects
      } catch (err) {
        this.error = err.message
        return []
      } finally {
        this.loading = false
      }
    },

    async getFeaturedProjects() {
      this.loading = true
      this.error = null
      try {
        const res = await projectService.getFeaturedProjects()
        this.projects = res.Projects
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async createProject(formData) {
      this.loading = true
      this.error = null
      try {
        const data = await projectService.createProject(formData)
        this.projects.push(data.project)
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async deleteProject(id) {
      this.loading = true
      this.error = null
      try {
        await projectService.deleteProject(id)
        // remove deleted project from local state
        this.projects = this.projects.filter(p => p._id !== id)
        if (this.selectedProject?._id === id) {
          this.selectedProject = null
          localStorage.removeItem('selectedProject')
        }
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async updateProject(id, updatedData) {
      this.loading = true
      this.error = null
      try {
        const updated = await projectService.updateProject(id, updatedData)

        // update local state
        this.projects = this.projects.map(p => p._id === id ? updated.updatedProject : p)

        if (this.selectedProject?._id === id) {
          this.selectedProject = updated.updatedProject
          localStorage.removeItem('selectedProject')
          localStorage.setItem('selectedProject', JSON.stringify(this.selectedProject))
        }
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async sendEmail(form) {
      this.loading = true
      this.error = null
      try {
        await projectService.sendEmail(form)
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
  }
})