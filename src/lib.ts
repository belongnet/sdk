import type { Options } from './types.js'
import {
  FRAME_DATA_HASH_KEY,
  createFrame,
  generatePaymentUrl,
  getCurrentFrame,
  mountPaymentFrame,
} from './utils.js'
import { hash as toHash } from 'ohash'

/**
 * Creates a payment frame for embedding payment forms.
 * @param options - The options for configuring the payment frame.
 * @returns The created payment frame.
 * ```
 */
export function createPaymentFrame(options: Options) {
  const { origin, params, el } = options

  const hash = toHash(options)
  let currentFrame: HTMLIFrameElement | null = null

  if (el) {
    currentFrame = getCurrentFrame(el)
    const currentHash = currentFrame?.getAttribute(
      'data-' + FRAME_DATA_HASH_KEY
    )

    console.log({
      hash,
      currentHash,
      currentFrame,
    })
    if (hash === currentHash) {
      console.log('reusing frame')
      return currentFrame
    }
  }

  const url = generatePaymentUrl(params, origin)
  let frame = createFrame({ url, hash })

  // Automatically mount is el is provided
  if (el) {
    frame = mountPaymentFrame({ el, frame, currentFrame })
  }

  return frame
}
