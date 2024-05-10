import * as v from 'valibot'
import { ParamsSchema, BelongPaymentEventDataSchema } from './schemas.js'
import type { BelongPaymentEventData, Params } from './types.js'
import queryString from 'query-string'

const APP_LINK = 'https://app.belong.net'

/**
 * Generates a payment URL based on the provided environment and checkout parameters.
 */
export function generatePaymentUrl(params: Params, origin: string = APP_LINK) {
  const query = v.parse(ParamsSchema, params)

  const base = v.parse(v.string([v.url()]), origin)

  const url = queryString.stringifyUrl(
    { url: base + '/payments', query },
    {
      skipEmptyString: true,
      skipNull: true,
    }
  )

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
 * @param event - The event to check.
 * @returns `true` if the event is a Belong payment event, otherwise `false`.
 */
export function isBelongPaymentEvent(
  event: MessageEvent
): event is MessageEvent<BelongPaymentEventData> {
  const result = v.safeParse(BelongPaymentEventDataSchema, event)
  return result.success
}
