import RefreshHandler from "./refresh.util";

export default class adminServices extends RefreshHandler{
    constructor(){
        super('http://localhost:8080/api/admin')
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
        if (!res.ok) throw new Error('Failed to update admin')
        
        return await res.json()
    }
}