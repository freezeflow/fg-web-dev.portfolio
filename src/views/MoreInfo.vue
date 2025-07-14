<template>
    <div class="more-info-container">
        <section class="more-info-content">
            <a href="/" aria-label="Back to home">&#8592;</a>
        </section>
        <section class="info-cards-container" id="more-info-cards" aria-labelledby="more-info-title">
            <InfoCards
                :icon="LayoutTemplate"
                color-class="purple"
                title="Design That Makes Sense"
                description="No clutter, no fluff. Just thoughtful, clean design built around your goals. Every element serves a purpose to guide user, express your brand, and help your product stand out without distractions."
            />
            <InfoCards 
                :icon="Rocket"
                color-class="blue"
                title="Blazing Fast, Always Optimized"
                description="We obsess over performance. From optimized assets to clean code, your site will load fast, feel smooth, and work like it should - even on slower networks. Because speed isn't just a feature, its trust."
            />
            <InfoCards 
                :icon="Globe"
                color-class="purple"
                title="SEO Friendly"
                description="We build websites with search engines in mind. Our SEO-friendly practices ensure that your site is easily discoverable, helping you reach a wider audience and achieve your business goals."
            />
            <InfoCards
                :icon="Shield"
                color-class="blue" 
                title="Secure & Fututre-Proof"
                description="We bake in security and scalibility from day one, so your website is safe, reliable and ready to grow with your vission." 
            />
            <InfoCards
                :icon="FileCode"
                color-class="purple" 
                title="Clean Code Philosophy"
                description="Every line of code we write can be explained in one sentence. From front-end logic to database design, our approach keeps things simple, maintainable and scalable."
            />
            <InfoCards
                :icon="TrendingUp"
                color-class="blue"
                title="Ready To Grow With You"
                description="Whether it's v1 or v10, we build with growth in mind. Our systems are modular, extendable, and built to evolve as your business scales - so you never have to start from scratch again."
            />
        </section>
    </div>
</template>
<script setup>
    import InfoCards from '@/components/info.cards.vue';
    import { 
        MonitorSmartphone, 
        LayoutTemplate, 
        Rocket, 
        TrendingUp,
        Globe,
        Shield,
        FileCode,
    } from 'lucide-vue-next';
</script>