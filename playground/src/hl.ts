import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

export const highlighter = await createHighlighterCore({
  themes: [
    import('shiki/themes/vitesse-dark.mjs'),
    import('shiki/themes/vitesse-light.mjs'),
  ],
  langs: [import('shiki/langs/javascript.mjs')],
  engine: createJavaScriptRegexEngine(),
})
