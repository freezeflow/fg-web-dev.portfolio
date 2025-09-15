import fetchApi from "./fetch.util"
import router from "@/router"

const fetch = new fetchApi(true)

export const handleClientLogout = async () =>{
    localStorage.removeItem('client')
    localStorage.removeItem('client_id')
    localStorage.removeItem('projects')
    localStorage.removeItem('role')

    await fetch.post( `${import.meta.env.VITE_API_URL}/api/client/auth/logout`)

    router.push('/')
}