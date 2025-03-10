import * as v from 'valibot'
import {
  ParamsSchema,
  PaymentEventDataSchema,
  PaymentEventSchema,
} from './schemas.js'
import type { PaymentEventData, Params } from './types.js'

const APP_LINK = 'https://app.belong.net'

function stringifyUrl(url: string, query: Record<string, string>) {
  const _query = Object.fromEntries(
    Object.entries(query).filter(
      ([key, value]) =>
        ![undefined, null, '', 'undefined', 'null'].includes(value)
    )
  )

  let params = new URLSearchParams(_query)
  url += '?' + params.toString()

  return url
}

/**
 * Generates a payment URL based on the provided environment and checkout parameters.
 */
export function generatePaymentUrl(params: Params, origin: string = APP_LINK) {
  const query = v.parse(ParamsSchema, params)
  const base = v.parse(v.pipe(v.string(), v.url()), origin)

  const url = stringifyUrl(base + '/payments', query)
  return url
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
export function createFrame(data: { url: string }) {
  const frame = document.createElement('iframe')

  Object.assign(frame, {
    width: '100%',
    height: '100%',
    frameBorder: '0',
    src: data.url,
  })

  return frame
}

/**
 * Mounts the provided iframe element to the provided element.
 */
export function mountFrame(el: HTMLElement, frame: HTMLIFrameElement) {
  // already mounted
  if (el.firstChild === frame) return

  // clears the container
  el.innerHTML = ''
  el.appendChild(frame)
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
