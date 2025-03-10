import { inject } from 'vue'
import type { HighlighterCore } from 'shiki/core'

export function useHighlighter() {
  const highlighter = inject<HighlighterCore>('highlighter')

  if (!highlighter) {
    throw new Error('Highlighter plugin not installed')
  }

  return highlighter
}
