<template>
  <footer class="w-full min-h-full flex flex-col gap-8 px-5" aria-label="Footer">
    <div class="w-full flex flex-col sm:flex-row sm:gap-24 gap-8">
      <header class="flex flex-col gap-3">
        <div class="flex flex-row items-center gap-3">
          <img src="/logo.svg" alt="" class="w-8"> <h1 class="text-xl font-display">Fynecode Development</h1>
        </div>
        
        <div class="text-slate-400 text-xs">
          <p>15th Road 1393</p>
          <p>Tsumeb, Namibia</p>
        </div>
      </header>

      <div class="footer-content flex flex-col gap-12">
        <div class="flex flex-col">
          <h3>Quick links</h3>
          <ol class="list-desc">
            <li><a href="#hero" class="text-slate-400 text-xs">Home</a></li>
            <li><a href="#services" class="text-slate-400 text-xs">Services</a></li>
            <li><a href="#projects" class="text-slate-400 text-xs">Projects</a></li>
            <li><a href="#process" class="text-slate-400 text-xs">Process</a></li>
          </ol>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-2 border border-x-0 border-y-white py-2">
      <h4>Contact details</h4>
      <div class="text-xs text-slate-400 flex flex-col sm:flex-row sm:gap-24 gap-1">
        <div class="flex flex-col">
          <strong class="text-white">Email:</strong> <p>fynecode.dev@gmail.com</p>
        </div>
        <div class="flex flex-col">
          <strong class="text-white">Tel:</strong> <p>+264 81 737 6386</p>
        </div>
      </div>
    </div>

     <div class="w-full flex flex-col-reverse md:flex-row justify-between max-sm:gap-4">
      <small class="copy text-white/70">&copy; 2025 Fynecode Development. All rights reserved.</small>
      <div class="flex flex-row gap-4">
        <a href="https://www.facebook.com/profile.php?id=61575824611472">
          <Github size="20" class="text-secondary"/>
        </a>
        <a href="https://www.facebook.com/profile.php?id=61575824611472">
          <Instagram size="20" class="text-secondary"/>
        </a>
        <a href="https://www.facebook.com/profile.php?id=61575824611472">
          <Facebook size="20" class="text-secondary"/>
        </a>
      </div>
     </div>
    
  </footer>
</template>

<script setup>
import { Facebook, Instagram, Github } from 'lucide-vue-next';
</script>
