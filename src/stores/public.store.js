import { defineStore } from 'pinia'

export const usePublicStore = defineStore('project', {
  state: () => ({
    loading: false,
    error: null,
    success: false,
    projects: []
  }),

  actions: {
    async getProjects() {
      this.loading = true;
      this.error = null;

      const raw = localStorage.getItem("featured")
      if(raw) {
        const cached = JSON.parse(raw)
        this.projects = cached
      }

      try {
        const fetchOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/public?status=published`,
          fetchOptions
        );

        if (!res.ok) throw new Error("Failed to fetch projects");

        const data = await res.json();
        
        localStorage.setItem("featured", JSON.stringify(data.featuredList))
        this.projects = data.featuredList;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    async sendEmail(form){
      this.loading = true;
      this.error = null;
      this.success = false

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/public/email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
          }
        );

        if (!res.ok) throw new Error("Failed to send email");

        const data = await res.json();
        this.success = true
        return data.message;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  },
})