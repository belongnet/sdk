import type { App } from 'vue'

export const highlighterPlugin = {
  install: async (app: App) => {
    const { createHighlighterCore } = await import('shiki/core')
    const { createJavaScriptRegexEngine } = await import(
      'shiki/engine/javascript'
    )
    const highlighter = await createHighlighterCore({
      themes: [
        import('shiki/themes/vitesse-dark.mjs'),
        import('shiki/themes/vitesse-light.mjs'),
      ],
      langs: [import('shiki/langs/javascript.mjs')],
      engine: createJavaScriptRegexEngine(),
    })

    // Make highlighter available globally in the app
    app.config.globalProperties.$highlighter = highlighter
    app.provide('highlighter', highlighter)
  },
}
