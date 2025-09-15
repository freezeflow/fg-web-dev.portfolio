<script setup>
    import { Clock, ArrowRight } from 'lucide-vue-next';

    defineProps({
        projectChanges: {
            type: Array,
            default: () => []
        }
    });
</script>

<template>
    <section>
        <header>
            <p><span><Clock/></span>Recent activity</p>
            <select name="" id="">
                <option value="">> 5 Days ago</option>
                <option value="">Last week</option>
                <option value="">Last month</option>
            </select>
        </header>
            <div class="project-changes-list">
                <ul>
                    <li v-for="(change, index) in projectChanges" :key="index" class="project-change-item">
                        <span><ArrowRight/></span> {{ change }}
                    </li>
                </ul>
            </div>
    </section>
</template>

<style scoped>
    section {
        color: white;
        font-family: var(--paragraph-font);
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        border-bottom: 1px solid var(--secondary);
        padding-bottom: 10px;
    }

    header p {
        font-size: 1.4rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-family: var(--heading-font);
    }

    header p span {
        color: var(--secondary);
        font-size: 1.2rem;
    }

    header select {
        padding: 0.1rem 0.7rem;
        border-radius: 5px;
        border: none;
        background-color: var(--off-color);
        border: 1px solid var(--secondary);
        color: white;
        font-family: var(--paragraph-font);
        cursor: pointer;
    }

    .project-changes-list {
        overflow-y: auto;
        max-height: 300px;
    }

    .project-changes-list ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .project-change-item {
        display: flex;
        gap: 0.5rem;
    }

    .project-change-item span {
        color: var(--secondary);
        font-size: 1rem;
    }
</style>