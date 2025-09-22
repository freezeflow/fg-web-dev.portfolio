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

      try {
        const fetchOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/projects/featured?fields=title description summary link tech dateCompleted`,
          fetchOptions
        );

        if (!res.ok) throw new Error("Failed to fetch projects");

        const data = await res.json();
        
        let projects = data.Projects;
        if (projects.length > 0) {
          // Fetch all files in parallel
          const filesData = await Promise.all(
            projects.map(async (p) => {
              const fileRes = await fetch(
                `${import.meta.env.VITE_API_URL}/api/project/files/${p._id}`,
                fetchOptions
              );
              if (!fileRes.ok) throw new Error("Failed to fetch project files");

              const files = await fileRes.json(); // depends on your API response
              return { id: p._id, file: files.filePath };
            })
          );

          // Merge files into projects
          projects = projects.map((proj) => {
            const fileInfo = filesData.find((f) => f.id === proj._id);
            return {
              ...proj,
              imgUrl: fileInfo ? fileInfo.filePath.filePath : '',
            };
          });
        }
        this.projects = projects;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  }
})