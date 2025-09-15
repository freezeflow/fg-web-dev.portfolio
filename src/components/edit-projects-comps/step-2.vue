<script setup>
import errorMessage from '../error-message.vue'

    const props = defineProps({
        form: {
            type: Object,
            required: true
        },

        errorCard:{
            type: Object,
            required: true
        },

        loader:{
            type: Object,
        },

        loading: {
            type: Boolean
        },

        error: String,
    })
</script>

<template>
    <div class="step2">
        <h2 v-if="!props.error && !props.loading">Con't</h2>
        <div class="comps">
            <component :is="props.errorCard" v-if="props.error" :msg="props.error" class="error-message"/>
            <component :is="loader" v-if="!props.error && props.loading" />
        </div>
        
        <div class="checkboxes">
            <label class="checkbox">
                <input
                    type="checkbox"
                    v-model="form.featured"
                />
                Is featured project
            </label>
            <label class="checkbox">
                <input
                    type="checkbox"
                    v-model="form.complete"
                />
                Is completed project
            </label>
            <input type="date" v-if="form.complete" class="completeDate" v-model="form.dateCompleted"/>
        </div>
    </div>
</template>

<style scoped>
    .step2{
        width: 100%;
        height: 100%;
        color: white;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 1rem;
    }

    .step2 h2{
        font-family: var(--header-font);
        text-align: center;
    }

    .checkboxes{
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .completeDate{
        width: 30%;
        padding: 0.5rem;
        color: var(--secondary);
        border: 1px solid var(--secondary);
        background-color: transparent;
        border-radius: 5px;
    }

    .comps{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>