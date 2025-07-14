import {createApp} from './src/main.js'

export default async function render(url) {
  const { app, router } = createApp()
  router.push(url)
  await router.isReady()
  return app
}