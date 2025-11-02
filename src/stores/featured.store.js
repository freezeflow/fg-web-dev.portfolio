import { defineStore } from 'pinia'
import FeaturedProjectService from '@/utils/featured.util'
import router from '@/router'

const featuredProjectService = new FeaturedProjectService()

export const useFeaturedProjectsStore = defineStore('featuredProjects', {
  state: () => ({
    featuredProjects: [],
    selectedFeaturedProject: null,
    loading: false,
    error: null
  }),

  actions: {
    async handleRequest(fn, ...args) {
      this.loading = true
      this.error = null
      try {
        const res = await fn(...args)
        return res
      } catch (err) {
        this.error = err instanceof Error ? err : new Error(String(err))
        throw this.error
      } finally {
        this.loading = false
      }
    },

    async getAllFeaturedProjects() {
      try {
        const result = await this.handleRequest(
          featuredProjectService.getAllFeaturedProjects.bind(featuredProjectService)
        )

        this.featuredProjects = result
      } catch (error) {
        this.error = error
      }
      
    },

    // async getFeaturedProject(id) {
    //   const project = await this.handleRequest(
    //     featuredProjectService.getFeaturedProject.bind(featuredProjectService),
    //     id
    //   )
    //   this.selectedFeaturedProject = project
    //   localStorage.setItem('selectedFeaturedProject', JSON.stringify(project))
    //   router.push('/featured-projects/project')
    // },

    async saveDetails(formData) {
      const temp = [...this.featuredProjects, formData]
      this.featuredProjects = temp

      const data = await this.handleRequest(
        featuredProjectService.createFeaturedProject.bind(featuredProjectService),
        formData
      )

      // Replace temp item with real one
      this.featuredProjects = this.featuredProjects.map(p =>
        p === formData ? data.project : p
      )
    },

    // async updateFeaturedProject(id, updatedData) {
    //   const updated = await this.handleRequest(
    //     featuredProjectService.updateFeaturedProject.bind(featuredProjectService),
    //     id,
    //     updatedData
    //   )

    //   this.featuredProjects = this.featuredProjects.map(p =>
    //     p._id === id ? updated.project : p
    //   )

    //   if (this.selectedFeaturedProject?._id === id) {
    //     this.selectedFeaturedProject = updated.project
    //   }
    // },

    // async deleteFeaturedProject(id) {
    //   await this.handleRequest(
    //     featuredProjectService.deleteFeaturedProject.bind(featuredProjectService),
    //     id
    //   )

    //   this.featuredProjects = this.featuredProjects.filter(p => p._id !== id)

    //   if (this.selectedFeaturedProject?._id === id)
    //     this.selectedFeaturedProject = null
    // }
  }
})
