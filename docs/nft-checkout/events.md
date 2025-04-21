# Event Handling

Learn how to handle various events during the NFT checkout process.

## Available Events

- `payment-success`: Triggered when payment is successfully completed
- `payment-error`: Triggered when payment fails
- `payment-canceled`: Triggered when user cancels the payment
- `loaded`: Triggered when the payment frame is fully loaded

## Event Payload Structure

### Success Event

```typescript
{
  address: string                    // Purchaser's wallet address
  hash?: string                      // Transaction hash
  block_number?: number           // Block number of the transaction
  cryptoAddress: {
    address: string             // Blockchain address
  }
  total?: number                 // Total purchase amount
  minted_price?: number          // Price at which NFT was minted
  tokens: Token[]                // Array of minted tokens
}

interface Token {
  token_id: string              // Unique identifier of the NFT
  token_uri: string             // Metadata URI
  price?: number                // Individual token price
  image?: string                // NFT image URL
  name?: string                 // NFT name
  attributes?: NftAttributes[]  // NFT metadata attributes
  mediaData?: any               // Additional media information
  qrSerialNumber?: string       // QR code serial number if applicable
}

interface NftAttributes {
  trait_type: string
  value: string | number
}
```

### Error Event

```typescript
{
  error: {
    code: string       // Error code
    message: string    // Human-readable error message
    details?: any      // Additional error details
  }
}
```

## Implementation Example

```typescript
import { isPaymentEvent, PaymentEvent } from '@belongnet/sdk'

function handlePaymentEvents(e: MessageEvent) {
  if (!isPaymentEvent(e)) return

  switch (e.data.type) {
    case PaymentEvent.PaymentSuccess:
      handleSuccess(e.data.payload)
      break
    case PaymentEvent.PaymentError:
      handleError(e.data.payload)
      break
    case PaymentEvent.PaymentCanceled:
      handleCancellation()
      break
    case PaymentEvent.Loaded:
      handleFrameLoaded()
      break
  }
}

window.addEventListener('message', handlePaymentEvents)
```

## Best Practices

1. **Always validate events**

   - Use `isPaymentEvent` helper
   - Verify payload structure
   - Handle unexpected data gracefully

2. **Implement proper cleanup**

   ```typescript
   function cleanup() {
     window.removeEventListener('message', handlePaymentEvents)
   }
   ```

3. **Handle all possible events**

   - Success cases
   - Error cases
   - Cancellation
   - Loading states

4. **Provide user feedback**
   - Show loading states
   - Display error messages
   - Confirm successful transactions
