import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const projectRoot = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: './',
  define: {
    __GAME_CAPTURE_ROOT__: JSON.stringify(resolve(projectRoot, '../MyData/GamesCapture')),
  },
  server: {
    fs: {
      allow: [resolve(projectRoot, '..')],
    },
  },
})
