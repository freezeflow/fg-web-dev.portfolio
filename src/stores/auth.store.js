import { defineStore } from "pinia";
import router from "@/router";
import AuthClass from "@/utils/auth.util";
import { handleAdminLogout } from "@/utils/admin.logout.util";

const authServ = new AuthClass()
export const useAuthStore = defineStore( 'auth', {
    // Set state for access token
    state: () =>({
        accessToken: '',
        loading: false,
        error: null
    }),
    actions:{
        // Login admin
        async adminLogin(form){
            this.loading = true
            this.error = null
            try {
                const res = await authServ.adminLogin(form)

                this.accessToken = res.accessToken
                return res
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },

        async clientLogin(form){
            this.loading = true
            this.error = null
            try {
                const res = await authServ.clientLogin(form)
                this.accessToken = res.accessToken
                return res
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },

        async verifyClientEmail(form){
            this.loading = true
            this.error = null
            try {
                const res = await authServ.verifyClientEmail(form)
                return res
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },

        async resetPin(form){
            this.loading = true
            this.error = null
            try {
                const res = await authServ.resetPin(form)
                return res
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },

        // Create function to call api to refresh access token
        async refreshAccessToken(){
            try {
                // Call api endpoint
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/refresh`, {
                    method: 'POST',
                    credentials: 'include'
                });

                // Set data
                const data = await response.json()

                // Check if response is okay
                if(!response.ok){
                    this.accessToken = ''
                    router.push('/admin/login');
                    return false
                }

                // Set access token if response is okay
                this.accessToken = data.accessToken;
                return true;
            } catch (error) {
                this.accessToken = ''
                router.push('/admin/login');
                handleAdminLogout()
                return false
            }
        }
    }
})