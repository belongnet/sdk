import type { Output } from 'valibot'
import {
  BelongPaymentEventDataSchema,
  BelongPaymentEventSchema,
  ParamsSchema,
  ModeOrigin,
} from './schemas.js'

export type Mode = keyof typeof ModeOrigin
export type Origins = (typeof ModeOrigin)[Mode]
export type Params = Output<typeof ParamsSchema>
export type BelongPaymentEventData = Output<typeof BelongPaymentEventDataSchema>
export type BelongPaymentEvent = Output<typeof BelongPaymentEventSchema>

export interface Options {
  mode: Mode
  el?: HTMLElement
  params: Params
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}
