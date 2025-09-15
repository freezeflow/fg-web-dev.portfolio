import fetchApi from "./fetch.util"
import router from "@/router"

export default class loggedClientServ {
    constructor() {
        // Use VITE_API_URL from your .env files
        this.base_route = `${import.meta.env.VITE_API_URL}/api/client/client`
        this.fetch = new fetchApi(true)
    }

    checkClientAuth(res) {
        if (res.status === 403 || res.status === 401) {
            router.push('/')
            return false
        }
        return true
    }

    async getClient(id) {
        const res = await this.fetch.get(`${this.base_route}/${id}`)

        if (!res.ok) throw new Error('Failed to fetch profile')
        if (!this.checkClientAuth(res)) throw new Error('Your session has ended')
        
        return await res.json()
    }

    async getProject(id) {
        const res = await this.fetch.get(`${this.base_route}/project/${id}`)

        if (!res.ok) throw new Error('Failed to fetch project')
        if (!this.checkClientAuth(res)) throw new Error('Your session has ended')
        
        return await res.json()
    }

    async getProjects(ids = []) {
        try {
            // fetch all projects in parallel
            const results = await Promise.all(
                ids.map(id => this.getProject(id))
            )
            return results
        } catch (err) {
            throw new Error(`Error fetching projects: ${err.message}`)
        }
    }

    async getTasks(id) {
        const res = await this.fetch.get(`${this.base_route}/task/${id}`)

        if (!res.ok) throw new Error('Failed to fetch tasks')
        if (!this.checkClientAuth(res)) throw new Error('Your session has ended')
        
        return await res.json()
    }
}
