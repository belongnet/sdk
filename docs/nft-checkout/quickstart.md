# Quick Start Guide

This guide will help you quickly integrate NFT checkout into your application.

## Prerequisites

1. **Get API Access**

   - Contact [join@belong.net](mailto:join@belong.net) to get your API key
   - You'll need this key to create checkout orders

2. **Install SDK**
   ```bash
   npm install @belongnet/sdk
   # or
   yarn add @belongnet/sdk
   # or
   pnpm add @belongnet/sdk
   ```

## Implementation Steps

### 1. Create Checkout Order

First, create an order using the API:

```typescript
async function createNftCheckout() {
  const response = await fetch('https://api.belong.net/api/v2/nft-checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'YOUR_API_KEY',
    },
    body: JSON.stringify({
      collectionId: '65f1c7a33e51d8e4c2a9b4d2',
      items: [
        {
          name: 'Test NFT #1',
          description: 'Description for Test NFT #1',
          mintPrice: 0.1,
          image: 'https://example.com/nft1.jpg',
          quantity: 1,
          externalUrl: 'https://example.com/nft1',
        },
      ],
    }),
  })

  const { data } = await response.json()
  return data.checkoutId // Response is wrapped in data object
}
```

### 2. Prepare HTML Container

Add a container element to your HTML where the checkout frame will be mounted:

```html
<div id="nft-checkout-frame"></div>
```

### 3. Initialize Checkout UI

Use the `checkoutId` from step 1 to create the payment frame:

```typescript
import { createPaymentFrame, PaymentTarget } from '@belongnet/sdk'

const checkoutId = await createNftCheckout()

const { frame } = createPaymentFrame({
  el: document.getElementById('nft-checkout-frame'),
  params: {
    target: PaymentTarget.Checkout,
    checkoutId: checkoutId,
  },
})
```

### 4. Handle Payment Events

Set up event listeners to handle payment status:

```typescript
import { isPaymentEvent, PaymentEvent } from '@belongnet/sdk'

function handlePaymentEvents(e: MessageEvent) {
  if (!isPaymentEvent(e)) return

  switch (e.data.type) {
    case PaymentEvent.PaymentSuccess:
      console.log('Payment successful!', e.data.payload)
      // Handle successful payment
      break
    case PaymentEvent.PaymentError:
      console.log('Payment failed:', e.data.payload)
      // Handle payment failure
      break
    case PaymentEvent.PaymentCanceled:
      console.log('Payment canceled')
      // Handle cancellation
      break
    case PaymentEvent.Loaded:
      console.log('Checkout frame loaded')
      // Frame is ready
      break
  }
}

window.addEventListener('message', handlePaymentEvents)

// Don't forget to clean up when done
function cleanup() {
  window.removeEventListener('message', handlePaymentEvents)
}
```

## Complete Example

Here's a complete implementation combining all steps:

```typescript
import {
  createPaymentFrame,
  PaymentTarget,
  isPaymentEvent,
  PaymentEvent,
} from '@belongnet/sdk'

class NFTCheckout {
  private cleanup: () => void

  constructor() {
    this.cleanup = () => {}
  }

  async initialize() {
    try {
      // 1. Create checkout order
      const checkoutId = await this.createNftCheckout()

      // 2. Initialize UI
      const { frame } = createPaymentFrame({
        el: document.getElementById('nft-checkout-frame'),
        params: {
          target: PaymentTarget.Checkout,
          checkoutId: checkoutId,
        },
      })

      // 3. Set up event handling
      const handlePayment = this.createEventHandler()
      window.addEventListener('message', handlePayment)

      // Store cleanup function
      this.cleanup = () => {
        window.removeEventListener('message', handlePayment)
      }
    } catch (error) {
      console.error('Failed to initialize checkout:', error)
    }
  }

  private async createNftCheckout() {
    const response = await fetch('https://api.belong.net/api/v2/nft-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'YOUR_API_KEY',
      },
      body: JSON.stringify({
        collectionId: '65f1c7a33e51d8e4c2a9b4d2',
        items: [
          {
            name: 'Test NFT #1',
            description: 'Description for Test NFT #1',
            mintPrice: 0.1,
            image: 'https://example.com/nft1.jpg',
            quantity: 1,
            externalUrl: 'https://example.com/nft1',
          },
        ],
      }),
    })

    const { data } = await response.json()
    return data.checkoutId // Response is wrapped in data object
  }

  private createEventHandler() {
    return (e: MessageEvent) => {
      if (!isPaymentEvent(e)) return

      switch (e.data.type) {
        case PaymentEvent.PaymentSuccess:
          this.handleSuccess(e.data.payload)
          break
        case PaymentEvent.PaymentError:
          this.handleError(e.data.payload)
          break
        case PaymentEvent.PaymentCanceled:
          this.handleCancellation()
          break
        case PaymentEvent.Loaded:
          this.handleLoaded()
          break
      }
    }
  }

  private handleSuccess(payload: any) {
    console.log('Payment successful!', payload)
    // Implement your success logic
  }

  private handleError(error: any) {
    console.error('Payment failed:', error)
    // Implement your error handling
  }

  private handleCancellation() {
    console.log('Payment canceled')
    // Implement your cancellation logic
  }

  private handleLoaded() {
    console.log('Checkout frame loaded')
    // Implement your loading logic
  }

  dispose() {
    this.cleanup()
  }
}

// Usage
const checkout = new NFTCheckout()
await checkout.initialize()

// Clean up when done
checkout.dispose()
```

## Next Steps

- Learn more about [Event Handling](./events.md)
- Check [Transaction Status](./checkout.md#getting-transaction-status) for monitoring your transactions
- Explore [Advanced Topics](./advanced.md) for customization options
- Check the [API Reference](./api-reference.md) for detailed documentation
