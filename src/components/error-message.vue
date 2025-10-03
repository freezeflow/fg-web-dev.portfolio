<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section class="error-message">
    <p>{{ msg }}</p>
  </section>
</template>

<style scoped>
.error-message {
  background-color: transparent;
  color: white;
  padding: 10px 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  font-family: var(--paragraph-font);
  text-align: center;
}

p{
  background-color: rgb(250, 44, 44);
  border: red;
  border-radius: 5px;
  padding: 5px;
}

@media screen and (max-width: 724px){
  .error-message{
    width: max-content;
  }

  .error-message p{
    font-size: 12px;
  }
}
</style>
