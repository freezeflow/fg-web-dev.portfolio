import RefreshHandler from './refresh.util.js'

export default class metricsServices extends RefreshHandler{
    constructor(){
        super('http://localhost:8080/api/metrics')
    }

    async getMetrics(){
        try {
            const res = await this.withRefreshRetry(() => 
                this.fetch.get(`${this.base_route}/`)
            )

            if(!res.ok) throw new Error('Failed to fetch metrics')
            
            return await res.json()
        } catch (error) {
            throw error
        }
    }
}