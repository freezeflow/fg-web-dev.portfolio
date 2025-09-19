import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import compress from 'vite-plugin-compression'

const buildTarget = process.env.BUILD_TARGET

export default defineConfig(({ command, ssrBuild }) => {
  const isSSR = !!ssrBuild

   return {
    base: '/fg-web-dev.portfolio/',

    plugins: [
      vue(),
      compress()
    ],
    build: {
      ssr: buildTarget === 'server' ? 'entry.server.js' : false,
      outDir: 'dist/client',
      ssrManifest: buildTarget !== 'server', // only client build needs ssrManifest
      rollupOptions: {
        input: './index.html',
        output: {
          format: 'esm',
        },
        external: buildTarget === 'server' ? [
          'vue',
          'vue-router',
          'pinia'
        ] : []
      }
    },
    ssr: {
      noExternal: [
        'chart.js',
        'vue-chartjs',
        'vue3-apexcharts',
        'apexcharts',
        'vue-i18n',
        'vue-router',
        'pinia',
        'vue-demi'
      ]
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})

