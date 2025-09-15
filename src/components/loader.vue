<script setup>

</script>

<template>
    <div class="loader">
        <span id="1"></span>
        <span id="2"></span>
        <span id="3"></span>
    </div>
</template>

<style scoped>
    .loader{
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    span{
        width: 20px;
        height: 20px;
        background-color: var(--secondary);
        border-radius: 100%;
        animation: load 0.6s ease-in-out infinite alternate;
    }

    .loader span:nth-child(2) {
        animation-delay: 0.2s;
    }

    .loader span:nth-child(3) {
        animation-delay: 0.4s;
    }

    @keyframes load {
        from { transform: translateY(0); }
        to   { transform: translateY(-10px); }
    }
</style>