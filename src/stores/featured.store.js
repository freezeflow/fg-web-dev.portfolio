import { defineStore } from 'pinia'
import FeaturedProjectService from '@/utils/featured.util'
import { useToast } from 'vue-toastification'

const featuredProjectService = new FeaturedProjectService()
const toast = useToast()

export const useFeaturedProjectsStore = defineStore('featuredProjects', {
  state: () => ({
    featuredProjects: [],
    selectedProject: null,
    loading: false,
    error: null
  }),

  actions: {
    // GENERIC HELPERS
    safeParse(key) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
      } catch (err) {
        toast.error(`Corrupted ${key} cache. Resetting...`);
        localStorage.removeItem(key);
        return null;
      }
    },

    saveCache(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },

    syncProjectsCache() {
      this.saveCache("projects", this.featuredProjects);
    },

    loadSelectedFromCache(id) {
      const cached = this.safeParse("selectedProject");
      return cached && cached._id === id ? cached : null;
    },

    saveSelectedToCache(project) {
      this.saveCache("selectedProject", project);
    },

    clearSelectedCache() {
      localStorage.removeItem("selectedProject");
    },

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

    // FETCH ALL PROJECTS
    async getAllFeaturedProjects() {
      try {
        // Load cached first
        const cached = this.safeParse("projects");
        if (cached) this.featuredProjects = cached;

        // Fetch latest
        const result = await this.handleRequest(
          featuredProjectService.getAllFeaturedProjects.bind(featuredProjectService)
        );

        this.featuredProjects = result;
        this.syncProjectsCache();
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load featured projects");
      }
    },

    // GET SINGLE PROJECT
    async getFeaturedProject(id) {
      try {
        // 1. load from cache
        let found = this.loadSelectedFromCache(id);

        // 2. if not in cache, try local state
        if (!found) {
          found = this.featuredProjects.find(p => p._id === id) || null;
        }

        // 3. apply immediate UI update
        if (found) {
          this.selectedProject = found;
        }

        // 4. fetch fresh version
        const project = await this.handleRequest(
          featuredProjectService.getFeaturedProject.bind(featuredProjectService),
          id
        );

        this.selectedProject = project;
        this.saveSelectedToCache(project);

      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load featured project");
      }
    },

    // CREATE PROJECT
    async createFeaturedProject(formData) {
      try {
        const cached = this.safeParse("projects");

        if (cached?.length >= 5) {
          toast.error("You have reached the maximum of 5 featured projects.");
          return;
        }

        // optimistic insert
        const temp = [...this.featuredProjects, formData];
        this.featuredProjects = temp;

        // request
        const res = await this.handleRequest(
          featuredProjectService.createFeaturedProject.bind(featuredProjectService),
          formData
        );

        // replace temp with real
        this.featuredProjects = this.featuredProjects.map(p =>
          p === formData ? res.project : p
        );

        this.syncProjectsCache();
        toast.success("New featured project created");

      } catch (error) {
        // rollback
        this.featuredProjects = this.featuredProjects.filter(p => p !== formData);
        toast.error(error?.message || "Failed to create project");
      }
    },

    // UPDATE PROJECT
    async updateFeaturedProject(id, updatedData) {
      let originalProject = null; // for rollback

      try {
        const index = this.featuredProjects.findIndex(p => p._id === id);

        if (index !== -1) {
          originalProject = { ...this.featuredProjects[index] };

          // optimistic update
          const optimistic = { ...originalProject, ...updatedData };
          this.featuredProjects[index] = optimistic;

          if (this.selectedProject?._id === id) {
            this.selectedProject = optimistic;
          }
        }

        // request
        const res = await this.handleRequest(
          featuredProjectService.updateFeaturedProject.bind(featuredProjectService),
          id,
          updatedData
        );

        const updatedProject = res.project;

        // update state properly
        this.featuredProjects = this.featuredProjects.map(p =>
          p._id === id ? updatedProject : p
        );

        if (this.selectedProject?._id === id) {
          this.selectedProject = updatedProject;
        }

        this.syncProjectsCache();
        this.saveSelectedToCache(updatedProject);
        toast.success("Project updated")
      } catch (error) {
        // rollback
        if (originalProject) {
          this.featuredProjects = this.featuredProjects.map(p =>
            p._id === id ? originalProject : p
          );
          if (this.selectedProject?._id === id) {
            this.selectedProject = originalProject;
          }
        }

        toast.error(error?.response?.data?.message || "Failed to update project");
      }
    },

    // DELETE PROJECT
    async deleteFeaturedProject(id) {
      let beforeDelete = [...this.featuredProjects];

      try {
        const existing = this.featuredProjects.find(p => p._id === id);
        if (!existing) {
          toast.error("Project not found locally.");
          return;
        }

        // optimistic delete
        this.featuredProjects = this.featuredProjects.filter(p => p._id !== id);

        if (this.selectedProject?._id === id) {
          this.selectedProject = null;
          this.clearSelectedCache();
        }

        // request
        await this.handleRequest(
          featuredProjectService.deleteFeaturedProject.bind(featuredProjectService),
          id
        );

        this.syncProjectsCache();

      } catch (error) {
        // rollback
        this.featuredProjects = beforeDelete;
        toast.error(error?.response?.data?.message || "Failed to delete project");
      }
    }
  }
})
