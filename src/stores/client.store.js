import { defineStore } from 'pinia'
import ClientService from '@/utils/client.util'
import { ProjectService } from '@/utils/project.util'
import ClientFileService from '@/utils/client.files.util'
import router from '@/router'

const clientService = new ClientService()
const clientFileService = new ClientFileService()
const projectServ = new ProjectService()

export const useClientStore = defineStore('clients', {
  state: () => ({
    clients: [],
    selectedClient: null,
    clientFiles: [],
    loading: false,
    error: null
  }),

  actions: {
    async getAllClients() {
      this.loading = true
      this.error = null
      try {
        this.clients = await clientService.getAllClients()
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async getClient(id) {
      this.loading = true
      this.error = null
      try {
        const client = await clientService.getClient(id)
        this.selectedClient = client
        localStorage.setItem('selectedClient', JSON.stringify(this.selectedClient))
        router.push('/clients/client')
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async getClientsByProjectIds(projectIds, fields = '') {
      this.loading = true
      this.error = null
      try {
        const clients = await clientService.getClientsByProjectIds(projectIds, fields)
        this.clients = clients
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async createClient(formData) {
      this.loading = true
      this.error = null
      try {
        this.clients.push(formData)

        const data = await clientService.createClient(formData)

        this.clients.pop()

        this.clients.push(data.createdClient)
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async deleteClient(id) {
      this.loading = true
      this.error = null
      try {
        await clientService.deleteClient(id)
        this.clients = this.clients.filter(c => c._id !== id)
        if (this.selectedClient?._id === id) {
          this.selectedClient = null
          localStorage.removeItem('selectedClient')
        }
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async updateClient(id, updatedData) {
      this.loading = true
      this.error = null
      try {
        const updated = await clientService.updateClient(id, updatedData)
        this.clients = this.clients.map(c => c._id === id ? updated.client : c)

        if (this.selectedClient?._id === id) {
          this.selectedClient = updated.client
          localStorage.setItem('selectedClient', JSON.stringify(this.selectedClient))
        }
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async getFilesByClient(clientId) {
      this.loading = true
      this.error = null
      try {
        this.clientFiles.files = await clientFileService.getFilesByClient(clientId)
        localStorage.setItem('clientFiles', JSON.stringify(this.clientFiles.files))
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async uploadClientFile(clientId, fileData) {
      this.loading = true
      this.error = null
      try {
        const uploaded = await clientFileService.uploadFile(clientId, fileData)
        this.clientFiles.push(uploaded.file)
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async deleteClientFile(fileId) {
      this.loading = true
      this.error = null
      try {
        await clientFileService.deleteFile(fileId)
        this.clientFiles = this.clientFiles.filter(f => f._id !== fileId)
        localStorage.removeItem('clientFiles')
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async downloadClientFile(filename) {
      this.loading = true
      this.error = null
      try {
        await clientFileService.downloadFile(filename)
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async getNonClientProjects() {
      this.loading = true
      this.error = null
      try {
        // Get all projects
        const projects = await projectServ.getAllProjects()

        // Get all clients
        const clients = await clientService.getAllClients()

        // Collect all project IDs assigned to clients
        const clientProjectIds = clients.flatMap(c => c.projects.map(p => p._id))

        // Filter out projects that are already in clientProjectIds
        const nonClientProjects = projects.filter(
          project => !clientProjectIds.includes(project._id)
        )
        
        return nonClientProjects
      } catch (error) {
        this.error = error.message || 'Failed to fetch non-client projects'
        return []
      } finally {
        this.loading = false
      }
    }
  }
})
