import * as v from 'valibot'
import { PaymentEvent, PaymentTarget } from './enums.js'
import type { MintedNft } from './types.js'

/**
 * Schema for payment frame parameters
 * @example
 * // Event ticket payment
 * {
 *   target: PaymentTarget.EventTicket,
 *   eventId: "65f1c7a33e51d8e4c2a9b4d2",
 *   coupon: "SUMMER2024" // optional
 *   email: "test@example.com" // optional
 * }
 *
 * // Hub minting payment
 * {
 *   target: PaymentTarget.HubMinting,
 *   hubId: "65f1c7b12f90ae7d31c8e5f1"
 *   email: "test@example.com" // optional
 * }
 *
 * // Checkout payment
 * {
 *   target: PaymentTarget.Checkout,
 *   checkoutId: "65f1c7b12f90ae7d31c8e5f1"
 *   email: "test@example.com" // optional
 * }
 */
export const ParamsSchema = v.variant('target', [
  v.object({
    target: v.literal(PaymentTarget.EventTicket),
    eventId: v.string(),
    key: v.optional(v.string()),
    coupon: v.optional(v.string()),
    email: v.optional(v.string()),
  }),
  v.object({
    target: v.literal(PaymentTarget.HubMinting),
    hubId: v.string(),
    key: v.optional(v.string()),
    email: v.optional(v.string()),
  }),
  v.object({
    target: v.literal(PaymentTarget.Checkout),
    checkoutId: v.string(),
    email: v.optional(v.string()),
  }),
])

export const PaymentEventDataSchema = v.variant('type', [
  v.object({
    type: v.literal(PaymentEvent.Loaded),
    payload: v.object({
      message: v.string(),
    }),
  }),
  v.object({
    type: v.literal(PaymentEvent.PaymentSuccess),
    payload: v.object({
      nft: v.object<MintedNft>(),
      link: v.string(),
      message: v.string(),
    }),
  }),
  v.object({
    type: v.literal(PaymentEvent.PaymentError),
    payload: v.object({
      message: v.string(),
      error: v.string(),
    }),
  }),
  v.object({
    type: v.literal(PaymentEvent.PaymentCanceled),
    payload: v.object({
      message: v.string(),
    }),
  }),
])

export const PaymentEventSchema = v.object({
  data: PaymentEventDataSchema,
  //origin: v.string(),
  //source: v.literal('belong_payment'),
})
