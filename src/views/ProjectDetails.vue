<template>
    <div class="w-full p-5 flex flex-col gap-10">
        <div class="w-1/2 rounded">
            <img src="../assets/background2.png" alt="" class="rounded">
        </div>
        <div class="text-white w-1/2 flex flex-col gap-20">
            <div class="w-full">
                <p class="text-3xl underline">
                    {{ project.title }}
                </p>
            </div>
            <div class="w-full flex flex-row gap-5 items-center">
                <Briefcase class="w-20 text-secondary"/>
                <p class="text-lg">
                    {{ project.description }}
                </p>
            </div>
            <div class="w-full flex flex-row gap-5 items-center">
                <component :is="roleIcons[project.role]" class="w-10 text-secondary" />
                <p class="flex flex-row gap-1 text-lg">
                    Role: {{ project.role }}
                </p>
            </div>
            <div class="w-full flex flex-row gap-5 items-center">
                <div class="flex flex-row gap-1 text-lg" v-for="(tech, index) in project.tech" :key="index">
                    <component :is="techIcons[tech]" class="w-10 text-secondary" />
                    <span>{{ tech }}</span>
                </div>
            </div>
            <div class="w-full flex flex-row gap-5 items-center" v-if="project.client">
                <User class="w-10 text-secondary"/>
                <p class="text-lg">
                    {{ project.client }}
                </p>
            </div>
            <div class="w-full flex flex-row gap-5 items-center" v-if="project.client">
                <Quote class="w-10 text-secondary"/>
                <p class="text-lg">
                    {{ project.testimonial }}
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, computed } from 'vue';
    import { useRoute } from 'vue-router';
    import {
        Briefcase, User, Quote,
        Layers, 
        Layout, 
        Server, 
        Code, 
        Cpu, 
        Palette, 
        Wind,
        Database,
        Leaf,
        CreditCard,
        BarChart2,
        Wifi,
        Triangle,
        Rocket,
        Flame,
        Mountain,
        GitBranch,
        Shapes,
        Bolt
    } from 'lucide-vue-next';

    const router = useRoute() 

    const id = Number(router.params.id)

    const projects = ref([
        {
            id: 1,
            title: "TechHub.io",
            description: "A sleek online hub that curates the latest tech trends, tools, and startup stories. Features community discussions and AI-driven content recommendations.",
            imgUrl: "/images/techhub-preview.jpg",
            link: "/projects/techhub",
            dateAdded: "2023-10-01",
            tech: ['Vue.js', 'Node.js', 'Tailwind CSS', 'MongoDB'],
            role: "Full Stack Developer",
            client: "TechHub Media",
            testimonial: "FG Web Development transformed our concept into a polished platform. The performance and clean design truly reflect our brand’s vision."
        },
        {
            id: 2,
            title: "Greenline Project Manager",
            description: "A collaborative project management platform that helps teams plan, track, and deliver projects efficiently. Includes task boards, team chat, and real-time analytics.",
            imgUrl: "/images/greenline-preview.jpg",
            link: "/projects/greenline",
            dateAdded: "2023-10-10",
            tech: ['Vue.js', 'Node.js', 'Tailwind CSS', 'Socket.io'],
            role: "Frontend Developer",
        },
        {
            id: 3,
            title: "Optive Analytics",
            description: "A data visualization dashboard that helps small businesses track web performance, user behavior, and conversion rates using clear, minimal charts.",
            imgUrl: "/images/optive-preview.jpg",
            link: "/projects/optive",
            dateAdded: "2023-11-02",
            tech: ['Vue.js', 'Express.js', 'Chart.js', 'PostgreSQL'],
            role: "Full Stack Developer",
            client: "Optive Digital",
            testimonial: "Floriaan was professional and attentive from day one. The analytics dashboard exceeded our expectations in speed and usability."
        },
        {
            id: 4,
            title: "Voyage Studio",
            description: "A portfolio and client management system for a creative design agency. Includes automated quote generation and integrated chat support.",
            imgUrl: "/images/voyage-preview.jpg",
            link: "/projects/voyage",
            dateAdded: "2023-11-15",
            tech: ['Nuxt.js', 'Node.js', 'Prisma', 'PostgreSQL'],
            role: "Full Stack Developer"
        },
        {
            id: 5,
            title: "Glowline Beauty",
            description: "An e-commerce website for a beauty brand, featuring a custom product gallery, secure checkout, and responsive design optimized for mobile users.",
            imgUrl: "/images/glowline-preview.jpg",
            link: "/projects/glowline",
            dateAdded: "2024-01-05",
            tech: ['Vue.js', 'Express.js', 'Stripe API', 'Tailwind CSS'],
            role: "Frontend Developer",
            client: "Glowline Cosmetics",
            testimonial: "FG Web Development gave us a store that feels premium yet simple to use. Our sales jumped 30% after launch."
        },
        {
            id: 6,
            title: "CreatorSpace",
            description: "A platform that allows digital creators to manage memberships, upload exclusive content, and track earnings — built for speed and simplicity.",
            imgUrl: "/images/creatorspace-preview.jpg",
            link: "/projects/creatorspace",
            dateAdded: "2024-03-21",
            tech: ['Vue.js', 'Node.js', 'Supabase', 'Tailwind CSS'],
            role: "Full Stack Developer"
        }
    ]);

    const roleIcons = {
        "Full Stack Developer": Layers,
        "Frontend Developer": Layout,
        "Backend Developer": Server,
        "Software Engineer": Code,
        "Lead Developer": Cpu,
        "Web Designer": Palette,
    }

    const techIcons = {
        'Vue.js': Triangle,
        'Node.js': Server,
        'Express.js': GitBranch,
        'Tailwind CSS': Wind,
        'Nuxt.js': Mountain,
        'MongoDB': Leaf,
        'PostgreSQL': Database,
        'Prisma': Shapes,
        'Supabase': Rocket,
        'Firebase': Flame,
        'Socket.io': Wifi,
        'Stripe API': CreditCard,
        'Chart.js': BarChart2,
        'JavaScript': Code,
        'CSS3': Layers,
        'HTML5': Code,
        'Vite': Bolt
    }

    const project = computed(() => projects.value.find(p => p.id === id))
</script>