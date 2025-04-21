import type { InferOutput } from 'valibot'
import {
  PaymentEventDataSchema,
  PaymentEventSchema,
  ParamsSchema,
} from './schemas.js'

export type Params = InferOutput<typeof ParamsSchema>
export type PaymentEventData = InferOutput<typeof PaymentEventDataSchema>
export type PaymentEvent = InferOutput<typeof PaymentEventSchema>

export type NftAttributes = {
  trait_type?: string
  display_type?:
    | 'date'
    | 'string'
    | 'number'
    | 'boost_number'
    | 'boost_percentage'
  value?: string
}

export interface MintedNft {
  address: string
  hash?: string
  block_number?: number
  cryptoAddress: { address: string }
  total?: number
  minted_price?: number
  tokens: {
    token_id: string
    token_uri: string
    price?: number
    image?: string
    name?: string
    attributes?: NftAttributes[]
    mediaData?: any
    qrSerialNumber?: string
  }
}

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
