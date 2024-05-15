import * as v from 'valibot'
import { PaymentEvent, PaymentTarget } from './enums.js'

export const ParamsSchema = v.variant('target', [
  v.object({
    target: v.literal(PaymentTarget.EventTicket),
    eventId: v.string(),
    key: v.optional(v.string()),
  }),
  v.object({
    target: v.literal(PaymentTarget.HubMinting),
    hubId: v.string(),
    key: v.optional(v.string()),
  }),
])

export const BelongPaymentEventDataSchema = v.variant('type', [
  v.object({
    type: v.literal(PaymentEvent.Loaded),
    payload: v.object({}),
  }),
  v.object({
    type: v.literal(PaymentEvent.PaymentSuccess),
    payload: v.object({
      link: v.string(),
    }),
  }),
  v.object({
    type: v.literal(PaymentEvent.PaymentError),
    payload: v.object({
      error: v.string(),
    }),
  }),
  v.object({
    type: v.literal(PaymentEvent.PaymentCanceled),
    payload: v.object({}),
  }),
])

export const BelongPaymentEventSchema = v.object({
  data: BelongPaymentEventDataSchema,
  //origin: v.string(),
  //source: v.literal('belong_payment'),
})
