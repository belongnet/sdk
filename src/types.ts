import type { Output } from 'valibot'
import {
  BelongPaymentEventDataSchema,
  BelongPaymentEventSchema,
  ModeScheme,
  ParamsSchema,
} from './schemas.js'

export type Mode = Output<typeof ModeScheme>
export type Params = Output<typeof ParamsSchema>
export type BelongPaymentEventData = Output<typeof BelongPaymentEventDataSchema>
export type BelongPaymentEvent = Output<typeof BelongPaymentEventSchema>

/**
 * The options for configuring the payment frame.
 */
export interface Options {
  el?: HTMLElement
  /**
   * The mode of the SDK.
   * @default 'production'
   */
  mode?: Mode
  params: Params
}
