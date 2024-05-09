import { parse, safeParse } from 'valibot'
import {
  ParamsSchema,
  BelongPaymentEventDataSchema,
  ModeScheme,
} from './schemas.js'
import type { BelongPaymentEventData, Params, Mode } from './types.js'

/**
 * Generates a payment URL based on the provided environment and checkout parameters.
 */
export function generatePaymentUrl(params: Params, mode: Mode) {
  const params_ = parse(ParamsSchema, params)

  const base = parse(ModeScheme, mode)

  const query = new URLSearchParams({ ...params_ })
  const url = new URL('/payments?' + query.toString(), base)

  return url.toString()
}

// export function generateSiteUrl(
//   path: string,
//   origin: AppEnvironment = AppEnvironment.Production
// ) {
//   return new URL(path, origin).toString()
// }

/**
 * Creates an iframe element with the provided URL.
 */
export function createFrame(url: string) {
  const frame = document.createElement('iframe')

  Object.assign(frame, {
    width: '100%',
    height: '100%',
    frameBorder: '0',
    src: url,
    id: 'belong-payment-frame',
  })

  return frame
}

/**
 * Mounts the provided iframe element to the provided element.
 */
export function mountFrame(frame: HTMLIFrameElement, element: HTMLElement) {
  if (!element) {
    throw new Error('Element not found')
  }

  // prevent multiple frames from being mounted
  const existingFrame = document.getElementById('belong-payment-frame')

  if (existingFrame) {
    element.removeChild(existingFrame)
  }

  // Append the frame to the provided element
  element.appendChild(frame)

  return frame
}

/**
 * Checks if the provided event is a Belong payment event.
 */
export function isBelongPaymentEvent(
  event: MessageEvent
): event is MessageEvent<BelongPaymentEventData> {
  const result = safeParse(BelongPaymentEventDataSchema, event)
  return result.success
}
