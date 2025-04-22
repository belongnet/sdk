import * as v from 'valibot'
import { PaymentEvent, PaymentTarget } from './enums.js'

export const NftAttributesSchema = v.object({
  trait_type: v.string(),
  display_type: v.union([
    v.literal('date'),
    v.literal('string'),
    v.literal('number'),
    v.literal('boost_number'),
    v.literal('boost_percentage'),
  ]),
  value: v.string(),
})

export const NftTokenSchema = v.object({
  token_id: v.string(),
  token_uri: v.string(),
  price: v.optional(v.number()),
  image: v.optional(v.string()),
  name: v.optional(v.string()),
  attributes: v.optional(v.array(NftAttributesSchema)),
  mediaData: v.optional(v.any()),
  qrSerialNumber: v.optional(v.string()),
})

export const NftSchema = v.object({
  address: v.string(),
  hash: v.optional(v.string()),
  block_number: v.optional(v.number()),
  cryptoAddress: v.object({
    address: v.string(),
  }),
  total: v.optional(v.number()),
  minted_price: v.optional(v.number()),
  tokens: v.array(NftTokenSchema),
})

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
      nft: NftSchema,
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
