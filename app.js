// backend/app.js

import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { renderToString } from 'vue/server-renderer'

// Needed because you're using ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const manifest = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../frontend/dist/client/.vite/ssr-manifest.json'), 'utf-8')
)
const template = fs.readFileSync(path.resolve(__dirname, '../frontend/dist/client/index.html'), 'utf-8')

const render = (await import('../frontend/dist/server/entry.server.js')).default

const app = express()
app.use((req, res, next) => {
  if (req.path === '/' || req.path === '/index.html') return next();
  express.static(path.resolve(__dirname, '../frontend/dist/client'), {
    maxAge: '1y',
    immutable: true,
  })(req, res, next);
});

// SSR route
app.get(/(.*)/, async (req, res) => {
  try {
    const appInstance = await render(req.url)
    const appHtml = await renderToString(appInstance)

    const html = template.replace('<!--app-html-->', appHtml)
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (err) {
    console.error('SSR error:', err)
    res.status(500).end('Internal Server Error')
  }
})

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`✅ SSR server running at http://localhost:${PORT}`)
})
