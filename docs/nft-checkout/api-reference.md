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
  target: PaymentTarget // Payment target type
  checkoutId: string // Unique checkout identifier
  coupon?: string // Optional coupon code
  email?: string // Email address (must be URL encoded if contains @)
  tokens?: TokenRequest[] // Optional token specifications
  theme?: ThemeOptions // Optional theme customization
}

// Note: When using email parameter, make sure to encode it using encodeURIComponent
// Example: email: encodeURIComponent('test@email.com') // 'test%40email.com'

interface TokenRequest {
  id: string // Token identifier
  quantity: number // Quantity to purchase
}

interface ThemeOptions {
  colors?: {
    primary: string
    secondary: string
    background: string
    text: string
  }
  borderRadius?: string
  fontFamily?: string
}
```

### isPaymentEvent

Checks if an event is a valid payment event.

```typescript
function isPaymentEvent(event: MessageEvent): boolean
```

## Constants

### PaymentTarget

Available payment targets:

```typescript
enum PaymentTarget {
  Checkout = 'checkout',
  EventTicket = 'event-ticket',
  HubMinting = 'hub-minting',
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
  address: Hex
  hash?: Hex
  block_number?: number
  cryptoAddress: {
    address: Address
  }
  total?: number
  minted_price?: number
  tokens: Token[]
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
type Hex = string // Hexadecimal string
type Address = string // Blockchain address string

interface NftAttributes {
  trait_type: string
  value: string | number
}
```
