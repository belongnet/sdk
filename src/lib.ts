import type { Options } from './types.js'
import { createFrame, generatePaymentUrl, mountFrame } from './utils.js'

export function createPaymentFrame(options: Options) {
  const { mode, params, el } = options

  const url = generatePaymentUrl(params, mode)
  let frame = createFrame(url)

  // Automatically mount the frame if an element is provided
  if (el) frame = mountFrame(frame, el)

  return frame
}
