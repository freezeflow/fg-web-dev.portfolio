import fetchApi from './fetch.util' 
import router from '@/router';
import { handleAdminLogout } from './admin.logout.util';

export default class AuthClass {
    constructor(){
        this.base_route = 'http://localhost:8080/api/auth';
        this.client_route = 'http://localhost:8080/api/client';
        this.fetch = new fetchApi(true)
    }

    async adminLogin(form){
        try {
            const res = await this.fetch.post(`${this.base_route}/sign-in`, form)

            if(res.status === 404) throw new Error('Invalid password or email');

            if (!res.ok) throw new Error('Failed to validate admin');

            return await res.json();
        } catch (error) {
            throw error
        }
    }

    async clientLogin(form){
        try {
            const res = await this.fetch.post(`${this.client_route}/sign-in`, form)

            if(res.status === 404) throw new Error('Invalid password or email');

            if (!res.ok) throw new Error('Failed to validate client');

            return await res.json();
        } catch (error) {
            throw error
        }
        
    }

    async verifyClientEmail(form){
        try {
            const res = await this.fetch.post(`${this.base_route}/verify`, form)

            if (!res.ok) throw new Error('Failed to validate email');

            return await res.json();
        } catch (error) {
            throw error
        }
        
    }

    async resetPin(form){
        try {
            const res = await this.fetch.put(`${this.base_route}/reset/${form.token}`, form)

            if (!res.ok) throw new Error('Failed to reset pin');

            return await res.json();
        } catch (error) {
            throw error
        }
        
    }

    async validatePassword(password) {
        const stored = localStorage.getItem('admin')
        let email
        if(!stored){
            router.push('/admin/login')
            handleAdminLogout()
        } 

        const adminInfo = JSON.parse(stored)

        email = adminInfo.email

        const form = { email, password };

        try {
            const res = await this.fetch.post(`${this.base_route}/sign-in`, form)

            if(res.status === 404) throw new Error('Invalid password');

            if (!res.ok) throw new Error('Failed to validate password');

            const data = await res.json();
            return { message: data.message, success: data.success };
        } catch (err) {
            return { message: this.error, success: false };
        }
    }
}
