import loggedClientServ from "@/utils/logged.client.services";
import { defineStore } from "pinia";

const clientServ = new loggedClientServ()

export const useLoggedClientStore = defineStore('loggedClient', {
    state: () => ({
        tasksByStatus: {
            staged: {},
            busy: {},
            complete: {},
            todo: {},
            overdue: {}
        },
        client: null,
        client_id: null,
        role: null,
        projects: [],
        loading: false,
        error: null
    }),

    actions: {
        setClient(id, client, role) {
            this.client_id = id
            this.client = client
            this.role = role

            localStorage.setItem('client_id', JSON.stringify(id))
            localStorage.setItem('client', JSON.stringify(client))
            localStorage.setItem('role', JSON.stringify(role))
        },

        loadClient() {
            const storedClient = localStorage.getItem('client')
            const storedId = localStorage.getItem('client_id')
            const storedRole = localStorage.getItem('role')

            if (storedClient && storedId) {
                this.client = JSON.parse(storedClient)
                this.client_id = JSON.parse(storedId)
                this.role = JSON.parse(storedRole)
            }
        },

        toKeyedObject(array) {
            return Object.fromEntries(array.map(item => [item._id, item]))
        },

        async getClient(id) {
            this.loading = true
            this.error = null
            try {
                const res = await clientServ.getClient(id)
                const client = res.client
                this.setClient(client._id, client, client.role)
            } catch (err) {
                this.error = err.message
                this.loadClient()
            } finally {
                this.loading = false
            }
        },

        async getProjects(ids) {
            this.loading = true
            this.error = null
            try {
                const projects = await clientServ.getProjects(ids)
                localStorage.setItem('projects', JSON.stringify(projects))
                this.projects = projects
            } catch (err) {
                console.error("Error fetching projects:", err)
                this.error = err.message
            } finally {
                this.loading = false
            }
        },

        loadProjects() {
            const storedProjects = localStorage.getItem('projects')
            if (storedProjects) {
                const projects = JSON.parse(storedProjects)
                this.projects = projects.map(p => p.foundProject)
            }
        },

        async fetchAllTasks(projectId) {
            this.loading = true
            this.error = null

            try {
                const statuses = Object.keys(this.tasksByStatus)
                let projectTasks = {}

                const fetched = await clientServ.getTasks(projectId)

                for (const status of statuses) {
                    const filtered = fetched.filter(task => task.status === status)
                    const keyed = this.toKeyedObject(filtered)

                    this.tasksByStatus[status] = keyed
                    projectTasks[status] = keyed

                    localStorage.setItem(
                        `${projectId}${status}Tasks`,
                        JSON.stringify(keyed)
                    )
                }

                return projectTasks
            } catch (err) {
                this.error = err.message
            } finally {
                this.loading = false
            }
        },
    }
})