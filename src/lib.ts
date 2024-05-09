import type { Options } from './types.js'
import { createFrame, generatePaymentUrl, mountFrame } from './utils.js'

export function createPaymentFrame(options: Options) {
  const { mode = 'production', params } = options

  const url = generatePaymentUrl(params, mode)
  let frame = createFrame(url)

  // Automatically mount the frame if an element is provided
  if (options.el) frame = mountFrame(frame, options.el)

  return frame
}
