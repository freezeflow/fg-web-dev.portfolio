<template>
    <div class="w-screen px-20 flex flex-col gap-10">
        <section class="" aria-labelledby="why-us-title">
            <h2 class="text-4xl text-white font-semibold" id="why-us-title">The types of websites we specialize in</h2>
        </section>
        <section class="w-full flex flex-row gap-10 justify-between items-center" aria-label="Website Qualities">
            <InfoCards 
                :icon="MonitorSmartphone"
                title="Portfolio & Business sites"
                description="Showcase your brand with fast, modern web design" 
            />
            <InfoCards
                :icon="ShoppingCart"
                title="E-commerce"
                description="Improve sales with simple & effective e-commerce sites"
            />
            <InfoCards 
                :icon="ToolCase"
                title="Web tools"
                description="Simplify workflows through powerful online tools"
            />
        </section>
    </div>
</template>

<script setup>
    import InfoCards from '@/components/info.cards.vue';
    import { MonitorSmartphone, ShoppingCart, ToolCase } from 'lucide-vue-next';
</script>