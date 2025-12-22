import { defineStore } from "pinia";

export const emailStore = defineStore('email',{
    state: () =>({
        loading: false,
        error: ''
    }),

    actions: {
        async sendEmail(form){
            try {
                const fetchOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const res = await fetch(
                    form,
                    `${import.meta.env.VITE_API_URL}/api/public/`,
                    fetchOptions
                );

                if (!res.ok) throw new Error("Failed to send message, please try again later");
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
})