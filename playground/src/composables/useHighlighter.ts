import { createHighlighterCore, type HighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import { shallowRef } from 'vue'

const highlighter = shallowRef<HighlighterCore | null>(null)
export function useHighlighter() {
  if (!highlighter.value) {
    createHighlighterCore({
      themes: [
        import('shiki/themes/vitesse-dark.mjs'),
        import('shiki/themes/vitesse-light.mjs'),
      ],
      langs: [import('shiki/langs/javascript.mjs')],
      engine: createJavaScriptRegexEngine(),
    }).then((result) => {
      highlighter.value = result
    })
  }

  return highlighter
}
