<template>
    <header>
        <h2>Our process</h2>
        <p>A collaborative, proven path from idea to launch</p>
    </header>
    <div class="process-wrapper" ref="wrapperRef" tabindex="0">
        <main class="process-container">
            <processInfo
                :processes="processSteps"
                :activeIndex="activeIndex"
            />
        </main>
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
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
    import processInfo from '@/components/process.info.vue';
    import processNav from '@/components/process.nav.vue';
    import { UserRoundSearch, Palette, Code2, Rocket } from 'lucide-vue-next';

    const processSteps = ref([
        {
            title: 'We get to know you',
            description: 'We begin with a discovery call or brief to understand your goals, audience, and product vision. The better we know you, the better we can build.',
        },
        {
            title: 'Crafting your digital identity',
            description: 'From wireframes to full mockups, we create a visual language thats minimal, clear, and tailord to your brand. Feedback is part of the process.',
        },
        {
            title: 'Bringing design to life',
            description: 'Using clean, scalable code, we build out the front and back end, ensuring everything performs smoothly accross devices and browsers.',
        },
        {
            title: 'Launch, monitor, and iterate',
            description: "We handle deployment, basic SEO, and site performance. Once live, we're here to adapt and improve as your business evolves.",
        },
    ])

    const icons = [
        UserRoundSearch,
        Palette,
        Code2,
        Rocket
    ];

    const activeIndex = ref(0);
    const isLocked = ref(false);
    const wrapperRef = ref(null);
    const isWrapperInView = ref(false);
    let observer;

    const handleProcessScroll = (e) => {
        if (!isWrapperInView.value) return;
        if(e.deltaY < 0 && activeIndex.value <= 0) return
        if(e.deltaY > 0 && activeIndex.value >= 3) return
            e.preventDefault(); // Always prevent window scroll if wrapper is in view
        if (isLocked.value) return;
            const delta = e.deltaY;
        if (delta > 0 && activeIndex.value < 3) {
            activeIndex.value++;
            isLocked.value = true;
            setTimeout(() => { isLocked.value = false; }, 1000);
        } else if (delta < 0 && activeIndex.value > 0) {
            activeIndex.value--;
            isLocked.value = true;
            setTimeout(() => { isLocked.value = false; }, 1000);
        }
    };

    onMounted(() => {
        observer = new window.IntersectionObserver(
            ([entry]) => {
                isWrapperInView.value = entry.intersectionRatio >= 0.9;
            },
            { threshold: [0, 0.9, 1] }
        );
        if (wrapperRef.value) {
            observer.observe(wrapperRef.value);
        }
        window.addEventListener('wheel', handleProcessScroll, { passive: false });
    });
    onUnmounted(() => {
        if (observer && wrapperRef.value) observer.unobserve(wrapperRef.value);
        window.removeEventListener('wheel', handleProcessScroll);
    });
</script>