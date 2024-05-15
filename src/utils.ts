import * as v from 'valibot'
import {
  ParamsSchema,
  PaymentEventDataSchema,
  PaymentEventSchema,
} from './schemas.js'
import type { PaymentEventData, Params } from './types.js'
import queryString from 'query-string'

const APP_LINK = 'https://app.belong.net'
export const FRAME_DATA_HASH_KEY = 'belongnet-sdk'

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
export function createFrame(data: { url: string; hash: string }) {
  const frame = document.createElement('iframe')

  Object.assign(frame, {
    width: '100%',
    height: '100%',
    frameBorder: '0',
    src: data.url,
  })

  frame.setAttribute('data-' + FRAME_DATA_HASH_KEY, data.hash)

  return frame
}

export function getCurrentFrame(el?: HTMLElement) {
  const frame = el?.querySelector('iframe[data-' + FRAME_DATA_HASH_KEY + ']')
  return frame && frame instanceof HTMLIFrameElement ? frame : null
}

/**
 * Mounts the provided iframe element to the provided element.
 */
export function mountPaymentFrame({
  el,
  frame,
  currentFrame,
}: {
  el: HTMLElement
  frame: HTMLIFrameElement
  currentFrame?: HTMLIFrameElement | null
}) {
  if (currentFrame) {
    el.removeChild(currentFrame)
  }

  // Append the frame to the provided element
  el.appendChild(frame)

  return frame
}

/**
 * Checks if the provided event is a Belong payment event.
 * @param event - The event to check.
 * @returns `true` if the event is a Belong payment event, otherwise `false`.
 */
export function isPaymentEvent(
  event: MessageEvent
): event is MessageEvent<PaymentEventData> {
  const result = v.safeParse(PaymentEventSchema, event)
  return result.success
}

/**
 * Validates the provided parameters.
 * @throws {Error} If the parameters are invalid.
 */
export function validateParams(params: Params): Params | never {
  return v.parse(ParamsSchema, params)
}

/**
 * Validates the provided payment event data.
 * @throws {Error} If the data is invalid.
 */
export function validateEvent(
  data: PaymentEventData
): PaymentEventData | never {
  return v.parse(PaymentEventDataSchema, data)
}
