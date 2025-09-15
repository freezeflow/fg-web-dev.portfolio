import fetchApi from './fetch.util'
import { useAuthStore } from '@/stores/auth.store'
import router from "@/router"

export default class RefreshHandler {
  constructor(baseRoute) {
    this.authStore = useAuthStore()
    this.router = router
    this.base_route = baseRoute
    this.fetch = new fetchApi(true, this.authStore.accessToken)
  }

  async refreshTokenIfNeeded(response) {
    if (response.status !== 403) return false

    const refreshRes = await this.fetch.refresh(response)

    if (!refreshRes.ok) {
      this.router.push('/admin/login')
      return true
    }

    const contentType = refreshRes.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      this.router.push('/admin/login')
      return true
    }

    const refreshData = await refreshRes.json()
    if (!refreshData.accessToken) {
      this.router.push('/admin/login')
      return true
    }

    this.authStore.accessToken = refreshData.accessToken
    this.fetch = new fetchApi(true, this.authStore.accessToken)
    return true
  }

  async withRefreshRetry(fetchCall) {
    let res = await fetchCall()
    const refreshed = await this.refreshTokenIfNeeded(res)
    if (refreshed) {
      res = await fetchCall()
    }
    return res
  }
}
