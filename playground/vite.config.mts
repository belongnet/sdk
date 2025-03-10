import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import Inspect from 'vite-plugin-inspect'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Inspect(), UnoCSS()],

  resolve: {
    alias: {
      '@belongnet/sdk': resolve('../src/index.ts'),
    },
  },
})
