<script setup>
    const props = defineProps({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        imgUrl: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        dateAdded: {
            type: String,
            required: true
        },
        summary: {
            type: String,
            required: true
        },
        tech: {
            type: Array,
            required: true
        }
    });

    const emits = defineEmits(['edit', 'delete'])

    import { ref } from 'vue';

    let isMoreInfoVisible = ref(false);
    const toggleMoreInfo = () => {
        isMoreInfoVisible.value = !isMoreInfoVisible.value;
    };

    const el = ref(null);
    defineExpose({ el })
</script>

<template>
    <div class="project-container" ref="el">
        <img :src="props.imgUrl" alt="Project image" v-if="!isMoreInfoVisible">
        <div :class="['project-info', isMoreInfoVisible ? 'more-info' : '']">
            <div class="project-title">
                <button class="back" @click="toggleMoreInfo" v-if="isMoreInfoVisible">&#8592;</button>
                <p class="">{{ title }}</p>
            </div>
            
            <div class="info" v-if="isMoreInfoVisible">
                <p class="desc">{{ description }}</p>
                <div class="tech-container">
                    <p>Tech used:</p>
                    <div class="tech-wrapper">
                        <p class="tech" v-for="tec in tech"> {{ tec }}</p>
                    </div>
                </div>
                <div class="feedback-contianer">
                    <p>Feedback:</p>
                    <div class="feedback-content">
                        <div class="feedback-wrapper">
                            <span class="client-image"></span>
                            <p class="feedback">{{ summary }}</p>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            <div class="summary" v-if="!isMoreInfoVisible">
                <p>{{ summary }}</p>

            </div>
            <div class="project-controls" v-if="!isMoreInfoVisible">
                <button @click="toggleMoreInfo">More info</button>
            </div>
            <!-- <p class="date" v-if="isMoreInfoVisible"><span>Launch date:</span> {{ dateAdded }}</p> -->
        </div>
    </div>
</template>

<style scoped>
.project-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    color: white;
    border-radius: 10px;
    width: 90%;
    height: 100%;
    font-family: var(--paragraph-font);
    min-height: 350px;
    max-height: 600px;
    box-sizing: border-box;
    flex-shrink: 0;
    scroll-snap-align: center;
    border: 1px solid white;
}

img {
    flex: 2;
    width: 100%;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.project-info {
    flex: 1;
    text-align: center;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: black;
    margin-top: auto;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    padding: 10px;
    transition: height 0.7s ease-in-out;
    min-height: 120px;
    box-sizing: border-box;
}

.project-title {
    font-size: 1.2rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
}

.project-title button{
    background-color: transparent;
    border: 1px solid var(--secondary);
    color: var(--secondary);
    width: 0;
    height: 0;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-weight: bold;
}

.project-info.more-info {
    margin: 0;
    height: 100%;
    transition: all 0.7s ease-in-out;
    border-radius: 10px;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
    gap: 2rem;
    overflow-y: auto;
}

.project-info.more-info .project-title{
    justify-content: unset;
    align-items: unset;
}

.project-info.more-info .project-title p{
    width: 100%;
    margin-right: 15px;
}

.project-info.more-info .info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1 1 0;
    min-height: 0;
}

.project-info.more-info .info .tech-container, .desc {
    border-bottom: 1px solid var(--off-color);
    padding: 1rem 0;
}

.tech-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 20px;
}

.tech-container> p {
    font-size: 1.1rem;
    margin: 0;
}

.tech-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.tech-wrapper p {
    padding: 2px 10px;
    background-color: var(--secondary);
    border-radius: 20px;
    color: white;
    margin: 0;
}

.project-controls {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
}

.feedback-contianer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    margin-top: 10px;
}

.feedback-contianer> p {
    font-size: 1.1rem;
}

.feedback-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    gap: 10px;
}

.feedback-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 100%;
    margin-bottom: 10px;
}

.client-image {
    width: 40px;
    height: 40px;
    border-radius: 360px;
    border: 1px solid black;
}

.feedback {
    font-style: italic;
    color: var(--secondary);
    font-size: 0.9rem;
}

.date {
    font-size: 0.8rem;
    color: #858585a4;
}

button {
    background-color: var(--secondary);
    color: white;
    border: none;
    padding: 5px 10px;
    width: 40%;
    border-radius: 5px;
    cursor: pointer;
}

button:focus {
    outline: none;
}

button:hover {
    opacity: 0.8;
}

.summary {
    font-size: 0.9rem;
    font-style: italic;
    margin-top: 10px;
    text-align: center;
}

/* Responsive adjustment for small screens */
@media (max-width: 700px) {
    .project-container {
        min-height: 250px;
        max-height: none;
    }

    .project-info {
        height: 40%;
    }

    .project-info, .project-info.more-info {
        width: 100%;
        padding: 8px;
    }
    img {
        height: 60%;
    }

    .client-image {
        width: 30px;
        height: 30px;
        border-radius: 360px;
        border: 1px solid black;
    }
}

@media (max-width: 465px){
    button{
        width: 70%;
    }
}
</style>