<template>
  <footer class="w-full h-full flex flex-col gap-8 px-5" aria-label="Footer">
    <!-- Footer Header -->
    <header>
      <h2 id="footer-contact" class="md:text-4xl sm:text-3xl text-2xl text-white font-semibold">
        Your thoughts, our inbox, let's talk
      </h2>
    </header>

    <div class="footer-content flex flex-col gap-8">
      <!-- Contact Form -->
      <form
        action="#"
        @submit.prevent
        class="flex flex-col gap-5 md:w-1/3 sm:w-1/2 w-full"
        aria-labelledby="footer-contact"
      >
        <div class="flex flex-row max-sm:flex-col gap-5 w-full">
          <div class="w-full">
            <label for="email" class="sr-only">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              v-model="form.email"
              placeholder="example@email.com"
              required
              class="bg-primary p-2 rounded min-w-full"
            />
          </div>
        </div>

        <div class="w-full">
          <label for="message" class="sr-only">Message</label>
          <textarea
            id="message"
            name="message"
            v-model="form.message"
            placeholder="Your message"
            required
            class="bg-primary p-2 rounded min-w-full"
          ></textarea>
        </div>

        <button
          type="submit"
          class="outline-0 border-2 border-secondary bg-primary w-1/2 rounded cursor-pointer"
        >
          Send
        </button>
      </form>

      <!-- Social Links -->
      <div class="flex flex-row gap-4">
        <a
          href="https://www.facebook.com/people/FG-web-development/61575824611472/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Fynecode Development on Facebook"
        >
          <Facebook class="text-secondary" aria-hidden="true" />
        </a>
        <a
          href="https://github.com/your-github-username"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Fynecode Development on GitHub"
        >
          <Github class="text-secondary" aria-hidden="true" />
        </a>
      </div>
    </div>

    <!-- Copyright -->
    <small class="copy text-white/70">&copy; 2025 Fynecode Development. All rights reserved.</small>
  </footer>
</template>

<script setup>
import { Facebook, Github, Loader2 } from 'lucide-vue-next'
import { reactive } from 'vue';

const form = reactive({
  email: '',
  message: ''
})
</script>
