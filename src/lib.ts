import type { Options } from './types.js'
import { createFrame, generatePaymentUrl, mountFrame } from './utils.js'

export function createPaymentFrame(options: Options) {
  const { mode = 'production', params } = options

  const url = generatePaymentUrl(params, mode)
  let frame = createFrame(url)

  const methods = {
    destroy: () => {},
    init(el?: HTMLElement) {
      const element = el || options.el
      if (!element) {
        throw new Error('Element is required')
      }
      frame = mountFrame(frame, element)
    },
  }

  // Automatically mount the frame if an element is provided
  if (options.el) methods.init()

  return {
    frame,
    ...methods,
  }
}
