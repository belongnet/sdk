import * as v from 'valibot'
import { ParamsSchema, BelongPaymentEventDataSchema } from './schemas.js'
import type { BelongPaymentEventData, Params, Mode } from './types.js'
import queryString from 'query-string'

/**
 * Returns the origin based on the provided mode.
 */
export function getOrigin(value: Mode) {
  switch (value) {
    case 'production':
      return 'https://app.belong.net'
    case 'staging':
      return '***REMOVED***'
    default:
      throw new Error('Invalid origin')
  }
}

/**
 * Generates a payment URL based on the provided environment and checkout parameters.
 */
export function generatePaymentUrl(params: Params, mode: Mode = 'production') {
  const query = v.parse(ParamsSchema, params)

  const base = getOrigin(mode)
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
