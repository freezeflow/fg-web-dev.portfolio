import { defineStore } from 'pinia'
import ClientService from '@/utils/client.util'
import ClientFileService from '@/utils/client.files.util'
import { ProjectService } from '@/utils/project.util'
import router from '@/router'

const clientService = new ClientService()
const clientFileService = new ClientFileService()
const projectService = new ProjectService()

export const useClientStore = defineStore('clients', {
  state: () => ({
    clients: [],
    selectedClient: null,
    clientFiles: [],
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

    async getAllClients() {
      this.clients = await this.handleRequest(clientService.getAllClients.bind(clientService))
    },

    async getClient(id) {
      const client = await this.handleRequest(clientService.getClient.bind(clientService), id)
      this.selectedClient = client
      localStorage.setItem('selectedClient', JSON.stringify(client))
      router.push('/clients/client')
    },

    async getClientsByProjectIds(projectIds, fields = '') {
      this.clients = await this.handleRequest(
        clientService.getClientsByProjectIds.bind(clientService),
        projectIds,
        fields
      )
    },

    async createClient(formData) {
      const temp = [...this.clients, formData] // optimistic UI
      this.clients = temp
      const data = await this.handleRequest(clientService.createClient.bind(clientService), formData)
      this.clients = this.clients.map(c => (c === formData ? data.createdClient : c))
    },

    async updateClient(id, updatedData) {
      const updated = await this.handleRequest(clientService.updateClient.bind(clientService), id, updatedData)
      this.clients = this.clients.map(c => (c._id === id ? updated.client : c))
      if (this.selectedClient?._id === id) {
        this.selectedClient = updated.client
      }
    },

    async deleteClient(id) {
      await this.handleRequest(clientService.deleteClient.bind(clientService), id)
      this.clients = this.clients.filter(c => c._id !== id)
      if (this.selectedClient?._id === id) this.selectedClient = null
    },

    async getFilesByClient(clientId) {
      this.clientFiles = await this.handleRequest(clientFileService.getFilesByClient.bind(clientFileService), clientId)
    },

    async uploadClientFile(clientId, fileData) {
      const uploaded = await this.handleRequest(clientFileService.uploadFile.bind(clientFileService), clientId, fileData)
      this.clientFiles.push(uploaded.file)
    },

    async deleteClientFile(fileId) {
      await this.handleRequest(clientFileService.deleteFile.bind(clientFileService), fileId)
      this.clientFiles = this.clientFiles.filter(f => f._id !== fileId)
    },

    async downloadClientFile(filename) {
      await this.handleRequest(clientFileService.downloadFile.bind(clientFileService), filename)
    },

    async getNonClientProjects() {
      const projects = await this.handleRequest(projectService.getAllProjects.bind(projectService))
      const clients = await this.handleRequest(clientService.getAllClients.bind(clientService))
      const clientProjectIds = clients.flatMap(c => c.projects.map(p => p._id))
      return projects.filter(project => !clientProjectIds.includes(project._id))
    }
  }
})
