import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), UnoCSS()],

  resolve: {
    alias: {
      '@belongnet/sdk': resolve('../src/index.ts'),
    },
  },
})
