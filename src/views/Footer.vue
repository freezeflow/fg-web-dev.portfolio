<template>
    <footer class="footer">
        <div class="footer-header">
            <h2>Your thoughts, our inbox, lets talk</h2>
        </div>
        <div class="footer-content">
            <form action="" @submit.prevent class="flex flex-col gap-5 w-1/3">
                <div class="flex flex-row gap-5 w-full">
                    <div class="w-full">
                        <input type="email" name="" id="" placeholder="example@email.com" class="bg-primary p-2 rounded min-w-full">
                    </div>
                    <div class="w-full">
                        <input type="text" name="" id="" placeholder="Joe Shmoe" class="bg-primary p-2 rounded w-full">
                    </div>
                </div>
                <div>
                    <textarea name="" id="" class="bg-primary p-2 rounded w-full"></textarea>
                </div>
                <button type="submit" class="outline-0 border-2 border-secondary bg-primary w-1/2 rounded cursor-pointer">Send</button>
            </form>
            <div class="socials">
                <a href="https://www.facebook.com/people/FG-web-development/61575824611472/">
                    <Facebook class="text-secondary"/>
                </a>
            </div>
        </div>
        <p class="copy">&copy; 2025 FG Web Development. All rights reserved.</p>
    </footer>
</template>

<script setup>
    import { Mail, Phone } from 'lucide-vue-next';
    import { Facebook, Github } from 'lucide-vue-next';
</script>