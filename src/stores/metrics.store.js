import metricsServices from "@/utils/metrics.util";
import { defineStore } from "pinia";

const metricsServ = new metricsServices()

export const useMetricsStore = defineStore('metrics', {
    state: () =>({
        lighthouse: null,
        uptime: null,
        loading: false,
        error: ''
    }),

    actions: {
        async getMetrics(){
            this.loading = true
            this.error = ''
            try {
                const res = await metricsServ.getMetrics()
                this.lighthouse = res.metrics[0].lighthouse
                this.uptime = res.metrics[0].uptime
            } catch (error) {
                this.error = error
            }
        }
    }
})