import RefreshHandler from "./refresh.util";

export default class adminServices extends RefreshHandler{
    constructor(){
        super('/api/admin')
    }

    async getAdmin(adminId) {
        const res = await this.withRefreshRetry(() =>
            this.fetch.get(`${this.base_route}/${adminId}`)
        )
        if (!res.ok) throw new Error('Failed to fetch admin')
        const data = await res.json()
        return data
    }

    async updateAdmin(adminId, form){
        const res = await this.withRefreshRetry(() =>
            this.fetch.put(`${this.base_route}/${adminId}`, form)
        )
        if (!res.ok) throw new Error('Failed to update profile')
    
        return await res.json()
    }

    async changePassword(adminId, form){
        const res = await this.withRefreshRetry(() =>
            this.fetch.put(`${this.base_route}/password/${adminId}`, form)
        )

        if (!res.ok) throw new Error(res.message)

        return await res.json()
    }
}