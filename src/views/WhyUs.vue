<template>
    <div class="why-us-container">
        <section class="why-us-content" aria-labelledby="why-us-title">
            <h2 class="h2-white" id="why-us-title">The qualities you can expect from our websites</h2>
        </section>
        <section class="info-cards-container" aria-label="Website Qualities">
            <InfoCards 
                :icon="MonitorSmartphone"
                color-class="blue"
                title="Built For Every Screen"
                description="From mobile to desktop, your website will feel native on any device. We design and build interfaces that adapt smoothly ensuring your users get the same freate experience no matter where they're browsing from." 
            />
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
                :icon="TrendingUp"
                color-class="purple"
                title="Ready To Grow With You"
                description="Whether it's v1 or v10, we build with growth in mind. Our systems are modular, extendable, and built to evolve as your business scales - so you never have to start from scratch again."
            />
        </section>
        <section class="more-info">
            <a href="/more-info" aria-label="Learn more about our web development qualities">More info</a>
        </section>
    </div>
</template>

<script setup>
    import InfoCards from '@/components/info.cards.vue';
    import { MonitorSmartphone, LayoutTemplate, Rocket, TrendingUp } from 'lucide-vue-next';
</script>