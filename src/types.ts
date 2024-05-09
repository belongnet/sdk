import type { Output } from 'valibot'
import {
  BelongPaymentEventDataSchema,
  BelongPaymentEventSchema,
  CheckoutParamsSchema,
  ModeOrigin,
} from './schemas.js'

export type Mode = keyof typeof ModeOrigin
export type Origins = (typeof ModeOrigin)[Mode]
export type CheckoutParams = Output<typeof CheckoutParamsSchema>
export type BelongPaymentEventData = Output<typeof BelongPaymentEventDataSchema>
export type BelongPaymentEvent = Output<typeof BelongPaymentEventSchema>

export interface Options {
  mode: Mode
  el?: HTMLElement
  params: CheckoutParams
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}
