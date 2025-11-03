<template>
    <div class="flex flex-col gap-10 w-full px-20">
        <header>
            <h2 class="text-4xl text-white font-semibold">Our process</h2>
        </header>
        <div class=" flex flex-row gap-10">
            <aside>
                <processNav
                    :icons="icons"
                    :activeIndex="activeIndex"
                    @icon1="activeIndex = 0"
                    @icon2="activeIndex = 1"
                    @icon3="activeIndex = 2"
                    @icon4="activeIndex = 3"
                />
            </aside>
            <main class="flex flex-col gap-[5.5rem]">
                <processInfo
                    :processes="processSteps"
                    :activeIndex="activeIndex"
                />
            </main>
            
        </div>
    </div>
    
</template>

<script setup>
    import { ref } from 'vue';
    import processInfo from '@/components/process.info.vue';
    import processNav from '@/components/process.nav.vue';
    import { UserRoundSearch, Palette, Code2, Rocket } from 'lucide-vue-next';

    const processSteps = ref([
        {
            title: 'Discovery',
            description: 'Understanding your vision.',
        },
        {
            title: 'Design',
            description: 'Crafting simple, clean interfaces',
        },
        {
            title: 'Development',
            description: 'Building scalable, performant systems',
        },
        {
            title: 'Delivery & Support',
            description: "Launch and maintain with confidence",
        },
    ])

    const icons = [
        UserRoundSearch,
        Palette,
        Code2,
        Rocket
    ];
</script>