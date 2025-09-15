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
    <span class="error-icon">!</span><p>{{ msg }}</p>
  </section>
</template>

<style scoped>
.error-message {
  background-color: transparent;
  color: white;
  border: 1px solid #0584d8;
  padding: 10px 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

@media screen and (max-width: 724px){
  .error-message{
    width: max-content;
  }

  .error-message p{
    font-size: 12px;
  }
}

@media screen and (max-width: 458px){
  
}

.error-icon {
  margin-right: 0.5rem;
  background-color: red;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-weight: 800;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
