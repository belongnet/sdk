import type { Options } from './types.js'
import { createFrame, generatePaymentUrl, mountFrame } from './utils.js'

const frameMap = new WeakMap<HTMLElement, HTMLIFrameElement>()

/**
 * Creates a payment frame for embedding payment forms.
 * @param options - The options for configuring the payment frame.
 * @returns The created payment frame.
 * ```
 */
export function createPaymentFrame(options: Options) {
  const { origin, params, el } = options

  if (!el) {
    throw new Error('Container element (el) must be provided')
  }

  const url = generatePaymentUrl(params, origin)
  let frame = frameMap.get(el)

  if (frame) {
    if (frame.src === url) {
      console.log('Reusing existing frame')
      return frame
    }

    // Update URL is changed
    frame.src = url
  } else {
    // Create frame if not exists
    frame = createFrame({ url })
    frameMap.set(el, frame)
    console.log('Creating new frame')
  }

  // Only remount the frame if it's not already in the container
  if (!el.contains(frame)) {
    mountFrame(el, frame)
  }

  return {
    frame,
    origin,
    params,
    url,
  }
}
