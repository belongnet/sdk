# API Reference

## Core Functions

### createPaymentFrame

Creates a payment frame for NFT checkout.

```typescript
function createPaymentFrame(options: PaymentFrameOptions): PaymentFrame

interface PaymentFrameOptions {
  el: HTMLElement // Container element for the frame
  origin?: string // Custom origin for postMessage
  params: PaymentParams // Payment parameters
}

interface PaymentParams {
  target: PaymentTarget // Payment target type (must be PaymentTarget.Checkout)
  checkoutId: string // Unique checkout identifier
  email?: string
}
```

### isPaymentEvent

Checks if an event is a valid payment event.

```typescript
function isPaymentEvent(event: MessageEvent): boolean
```

## Constants

### PaymentTarget

Available payment target for NFT Checkout:

```typescript
enum PaymentTarget {
  Checkout = 'checkout',
}
```

### PaymentEvent

Payment event types:

```typescript
enum PaymentEvent {
  Loaded = 'loaded',
  PaymentSuccess = 'payment-success',
  PaymentError = 'payment-error',
  PaymentCanceled = 'payment-canceled',
}
```

## Event Payloads

### SuccessPayload

```typescript
interface SuccessPayload {
  address: string // The wallet address that completed the payment
  hash?: string // Transaction hash (present after blockchain confirmation)
  block_number?: number // Block number (present after blockchain confirmation)
  cryptoAddress: {
    address: string // The wallet address in standard format
  }
  total?: number // Total amount paid (in ETH)
  minted_price?: number // Price per NFT (in ETH)
  tokens: Token[] // Array of minted tokens
}

interface Token {
  token_id: string
  token_uri: string
  price?: number
  image?: string
  name?: string
  attributes?: NftAttributes[]
  mediaData?: any
  qrSerialNumber?: string
}
```

### ErrorPayload

```typescript
interface ErrorPayload {
  error: {
    code: string
    message: string
    details?: any
  }
}
```

## Type Definitions

```typescript
interface NftAttributes {
  trait_type: string
  value: string | number
}
```
