// uno.config.ts
import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  theme: {
    colors: {
      primary: '#333438',
      secondary: '#f3f4f6',
    },
  },
  transformers: [transformerDirectives()],
})
