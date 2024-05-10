import type { Options } from './types.js'
import { createFrame, generatePaymentUrl, mountFrame } from './utils.js'

/**
 * Creates a payment frame for embedding payment forms.
 * @param options - The options for configuring the payment frame.
 * @returns The created payment frame.
 * ```
 */
export function createPaymentFrame(options: Options) {
  const { origin, params, el } = options

  const url = generatePaymentUrl(params, origin)
  let frame = createFrame(url)

  // Automatically mount the frame if an element is provided
  if (el) frame = mountFrame(frame, el)

  return frame
}
