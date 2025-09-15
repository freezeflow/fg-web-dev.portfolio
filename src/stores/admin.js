import { defineStore } from 'pinia';
import adminServices from '@/utils/admin.util';

const adminServ = new adminServices()

export const useAdminStore = defineStore('admin', {
  state: () => ({
    loading: false,
    error: null,
    admin: '',
    admin_id: '',
    role: ''
  }),
  actions: {
    setAdmin(admin, id, role) {
      localStorage.setItem('admin', JSON.stringify(admin));
      localStorage.setItem('admin_id', JSON.stringify(id));
      localStorage.setItem('role', JSON.stringify(role));
    },

    loadAdmin(){
      const storedAdmin = localStorage.getItem('admin')
      const storedId = localStorage.getItem('admin_id')
      const storedRole = localStorage.getItem('role')

      if(storedAdmin && storedId){
        this.admin = JSON.parse(storedAdmin)
        this.admin_id = JSON.parse(storedId)
        this.role = JSON.parse(storedRole)
      }
    },

    clearAdmin() {
      localStorage.removeItem('admin');
      localStorage.removeItem('admin_id');
      localStorage.removeItem('role');
    },

    async updateAdmin(id, form){
      this.loading = true
      this.error = ''
      try {
        const res = adminServ.updateAdmin(id, form)
        const admin = res.updatedAdmin
        this.setAdmin(admin, admin._id, admin.role)
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
});