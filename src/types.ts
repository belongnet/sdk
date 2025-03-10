import type { InferOutput } from 'valibot'
import {
  PaymentEventDataSchema,
  PaymentEventSchema,
  ParamsSchema,
} from './schemas.js'

export type Params = InferOutput<typeof ParamsSchema>
export type PaymentEventData = InferOutput<typeof PaymentEventDataSchema>
export type PaymentEvent = InferOutput<typeof PaymentEventSchema>

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
