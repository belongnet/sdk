import {
  object,
  type Output,
  string,
  variant,
  literal,
  optional,
  enum_,
  parse,
} from 'valibot'

export enum ModeOrigin {
  production = 'https://app.belong.net',
  staging = '***REMOVED***',
}

export const ModeScheme = enum_(ModeOrigin)

export type Mode = keyof typeof ModeOrigin
export type Origins = (typeof ModeOrigin)[Mode]

export const CheckoutParamsSchema = variant('target', [
  object({
    target: literal('event-ticket'),
    eventId: string(),
    key: optional(string()),
  }),
  object({
    target: literal('hub-minting'),
    hubId: string(),
    key: optional(string()),
  }),
])

export type CheckoutParams = Output<typeof CheckoutParamsSchema>

export const BelongPaymentEventDataSchema = variant('type', [
  object({
    type: literal('checkout-success'),
    payload: object({
      link: string(),
    }),
  }),
  object({
    type: literal('checkout-error'),
    payload: object({
      error: string(),
    }),
  }),
])

export type BelongPaymentEventData = Output<typeof BelongPaymentEventDataSchema>

export const BelongPaymentEventSchema = object({
  data: BelongPaymentEventDataSchema,
  origin: string(),
  source: literal('belong_payment'),
})

export type BelongPaymentEvent = Output<typeof BelongPaymentEventSchema>
