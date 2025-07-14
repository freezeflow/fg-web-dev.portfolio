<template>
    <footer class="footer">
        <div class="footer-header">
            <h2>Your thoughts, our inbox, lets talk</h2>
        </div>
        <div class="footer-content">
            <h3>Contact us at:</h3>
            <div>
                <div>
                    <Mail class="contact-icons" /> <a href="mailto:gfloriaan616@gmail.com">gfloriaan616@gmail.com</a>
                </div>
                <div>
                    <Phone class="contact-icons" /> <a href="tel:+264 81 737 6386">+264 81 737 6386</a>
                </div>
            </div>
            <div class="socials">
                <a>
                    <Facebook class="social-icons"/>
                </a>
                <a>
                    <Github class="social-icons"/>
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