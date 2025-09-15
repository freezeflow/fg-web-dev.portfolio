import fetchApi from "./fetch.util"
import router from "@/router"

const fetch = new fetchApi(true)

export const handleAdminLogout = async () =>{
    let id
    const storedId = localStorage.getItem('admin_id')
    if(storedId) id = JSON.parse(storedId)

    await fetch.patch( `${import.meta.env.VITE_API_URL}/api/auth/logout/${id}`)

    localStorage.removeItem('admin')
    localStorage.removeItem('admin_id')
    localStorage.removeItem('selectedProject')
    localStorage.removeItem('selectedProjects')
    localStorage.removeItem('selectedClient')
    localStorage.removeItem('clientFiles')
    localStorage.removeItem('role')

    router.push('/admin/login')
}