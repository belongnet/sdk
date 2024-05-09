import { parse, safeParse } from 'valibot'
import {
  type CheckoutParams,
  CheckoutParamsSchema,
  BelongPaymentEventDataSchema,
  ModeScheme,
  type Mode,
  type BelongPaymentEventData,
} from './schemas.js'

/**
 * Generates a payment URL based on the provided environment and checkout parameters.
 */
export function generatePaymentUrl(params: CheckoutParams, mode: Mode) {
  const params_ = parse(CheckoutParamsSchema, params)

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
    scrolling: 'no',
    src: url,
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
