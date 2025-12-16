<template>
  <footer class="w-full h-full flex flex-col gap-8 px-5 max-sm:px-5" aria-label="Footer">
    <!-- Footer Header -->
    <header>
      <h2 id="footer-contact" class="text-4xl max-sm:text-2xl text-white font-semibold">
        Your thoughts, our inbox, let's talk
      </h2>
    </header>

    <div class="footer-content flex flex-col max-sm:flex-col gap-8">
      <!-- Contact Form -->
      <form
        action="#"
        @submit.prevent
        class="flex flex-col gap-5 w-1/3 max-sm:w-full"
        aria-labelledby="footer-contact"
      >
        <div class="flex flex-row max-sm:flex-col gap-5 w-full">
          <div class="w-full">
            <label for="email" class="sr-only">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@email.com"
              required
              class="bg-primary p-2 rounded min-w-full"
            />
          </div>
        </div>

        <div>
          <label for="message" class="sr-only">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Your message"
            required
            class="bg-primary p-2 rounded w-full"
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
import { Facebook, Github } from 'lucide-vue-next'
</script>
