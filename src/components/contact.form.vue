<template>
    <div class="fixed top-0 left-0 z-50 bg-black/40 h-screen w-screen flex justify-center items-center">
        <div class="flex flex-col-reverse lg:flex-row justify-between w-4/5 h-[90%] lg:size-4/5 bg-navy rounded-lg">
            <div class="h-full p-4 flex flex-col gap-4">
                <div class="hidden lg:flex flex-row items-center gap-4 mb-8">
                    <img src="/logo.svg" alt="" class="w-10">
                    <h1 class="text-white text-4xl font-display">Fynecode Development</h1>
                </div>
                <div class="lg:h-full h-1/4 flex flex-col justify-between">
                    <!-- <h3 class="text-xl text-white">Contact us</h3> -->
                    <div class="hidden lg:flex flex-col gap-8 text-gray-500">
                        <p class="flex flex-row items-center gap-2"><Map size="18"/> 15th Road 1393, Tsumeb Namibia</p>
                        <p class="flex flex-row items-center gap-2"><Phone size="18"/> 081 737 6386</p>
                        <p class="flex flex-row items-center gap-2"><Mail size="18"/> fynecode.dev@gmail.com</p>
                    </div>

                    <div class="lg:border lg:border-secondary lg:border-x-0 lg:border-b-0 lg:py-4 text-gray-500 flex flex-row gap-4">
                        <Github size="20" class="cursor-pointer"/>
                        <Instagram size="20" class="cursor-pointer"/>
                        <Facebook size="20" class="cursor-pointer"/>
                    </div>
                </div>
                
            </div>
            <form @submit.prevent class="max-sm:rounded-lg lg:w-1/2 h-full bg-primary text-white p-4 flex flex-col justify-center items-center gap-8">
                <div class="w-full flex flex-col gap-1">
                    <h2 class="text-3xl">Get in touch</h2>
                    <p class="text-gray-500">Send us an email, we reply within 48 hours</p>
                </div>

                <div v-if="!publicStore.success" class="w-full flex flex-col gap-1">
                    <label for="name">Name:</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        class="bg-navy p-2 rounded-lg w-full lg:w-4/5"
                        required
                        minlength="2"
                        pattern="^[A-Za-z\s]+$"
                        title="Name should only contain letters and spaces, minimum 2 characters"
                        v-model="form.name"
                    >
                </div>

                <div v-if="!publicStore.success" class="w-full flex flex-col gap-1">
                    <label for="email">Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        class="bg-navy p-2 rounded-lg w-full lg:w-4/5"
                        required
                        title="Please enter a valid email address"
                        v-model="form.email"
                    >
                </div>

                <div v-if="!publicStore.success" class="w-full flex flex-col gap-1">
                    <label for="message">Message:</label>
                    <textarea 
                        name="message"
                        id="message"
                        class="bg-navy p-2 rounded-lg w-full lg:w-4/5"
                        required
                        minlength="10"
                        title="Message must be at least 10 characters long"
                        v-model="form.message"
                    ></textarea>
                </div>

                <div
                    v-if="publicStore.success"
                    class="w-full h-3/5 flex flex-col gap-2 justify-center items-center">
                    <CheckCircle size="64" class="bg-green-500 p-4 rounded-full text-white"/>
                    <p>Email sent!</p>
                </div>

                <div class="w-full flex flex-row gap-4">
                    <button
                        @click="emits('close')" 
                        class="cursor-pointer w-full lg:w-1/4 px-4 py-2 bg-gray-600 rounded-lg flex flex-row items-center gap-2">
                        <X />
                        Close
                    </button>
                    <button
                        v-if="!publicStore.success"
                        @click="sendEmail"
                        class="cursor-pointer w-full lg:w-1/4 px-4 py-2 bg-secondary rounded-lg flex flex-row items-center gap-2"
                    >
                        <Mail v-if="!publicStore.loading"/>
                        <Loader2 v-if="publicStore.loading" class="animate-spin"/>
                        Send
                    </button>
                </div>
            </form>
        </div>
        
    </div>
</template>

<script setup>
    import { Mail, X, Phone, Map, CheckCircle, Loader2, Github, Instagram, Facebook } from 'lucide-vue-next';
    import { usePublicStore } from '@/stores/public.store'
    import { reactive, ref } from 'vue';

    const emits = defineEmits(['close'])
    const publicStore = usePublicStore()
    const res = ref()

    const form = reactive({
        email: '',
        name: '',
        message: ''
    })

    async function sendEmail(){
        res.value = await publicStore.sendEmail(form)
    }
</script>