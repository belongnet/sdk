import { object, string, variant, literal, optional, enum_ } from 'valibot'

export enum ModeOrigin {
  production = 'https://app.belong.net',
  staging = '***REMOVED***',
}

export const ModeScheme = enum_(ModeOrigin)

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

export const BelongPaymentEventSchema = object({
  data: BelongPaymentEventDataSchema,
  origin: string(),
  source: literal('belong_payment'),
})
