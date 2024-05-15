import type { Output } from 'valibot'
import {
  PaymentEventDataSchema,
  PaymentEventSchema,
  ParamsSchema,
} from './schemas.js'

export type Params = Output<typeof ParamsSchema>
export type PaymentEventData = Output<typeof PaymentEventDataSchema>
export type PaymentEvent = Output<typeof PaymentEventSchema>

/**
 * The options for configuring the payment frame.
 */
export interface Options {
  /**
   * The element to mount the payment frame to.
   */
  el?: HTMLElement
  /**
   * The origin of the payment frame.
   */
  origin?: string
  /**
   * The parameters for the payment frame.
   */
  params: Params
}
