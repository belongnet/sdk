import { type HighlighterCore, getHighlighterCore } from 'shiki/core'
import { shallowRef } from 'vue'

const highlighter = shallowRef<HighlighterCore>()

export function usehighlighter() {
  if (typeof window !== 'undefined') {
    getHighlighterCore({
      themes: [
        import('shiki/themes/vitesse-dark.mjs'),
        import('shiki/themes/vitesse-light.mjs'),
      ],
      langs: [import('shiki/langs/javascript.mjs')],
      loadWasm: import('shiki/wasm'),
    }).then((h) => {
      highlighter.value = h
    })
  }

  return {
    highlighter,
  }
}
