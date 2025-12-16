import { defineStore } from 'pinia'

export const useProjectStore = defineStore('project', {
  state: () => ({
    loading: false,
    error: null,
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
          `${import.meta.env.VITE_API_URL}/api/public/`,
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
  }
})