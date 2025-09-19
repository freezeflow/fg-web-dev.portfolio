import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import compress from 'vite-plugin-compression'

const buildTarget = process.env.BUILD_TARGET

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig(({ command, ssrBuild }) => {
  return {
    base: isProduction ? '/' : '/fg-web-dev.portfolio/', // use '/' in production
    plugins: [
      vue(),
      compress()
    ],
    build: {
      outDir: 'dist/client',        // your current output folder
      rollupOptions: {
        input: './index.html'
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
});


