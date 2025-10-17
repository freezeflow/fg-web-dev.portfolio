import { defineStore } from 'pinia'
import AdminServices from '@/utils/admin.util'
import router from '@/router'

const adminServ = new AdminServices()

export const useAdminStore = defineStore('user', {
  state: () => ({
    loading: false,
    error: null,
    user: null,
    role: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    isAdmin: (state) => state.role === 'admin',
    isClient: (state) => state.role === 'client',
  },

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

    async initAdmin() {
      const data = await this.handleRequest(adminServ.getAdmin.bind(adminServ))
      this.user = data?.admin || data
      this.role = this.user?.role || null
    },

    async fetchAdmin() {
      const data = await this.handleRequest(adminServ.getAdmin.bind(adminServ))
      this.user = data?.admin || data
    },

    async updateAdmin(form) {
      const res = await this.handleRequest(adminServ.updateAdmin.bind(adminServ), form)
      this.user = res.updatedAdmin || res
    },

    async changePassword(form) {
      await this.handleRequest(adminServ.changePassword.bind(adminServ), form)
    },

    clearAdmin() {
      this.user = null
      this.role = null
      this.error = null
    }
  }
})