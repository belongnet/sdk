# Quick Start Guide

This guide will help you quickly integrate NFT checkout into your application.

## Prerequisites

1. **Get API Access**

   - Contact [join@belong.net](mailto:join@belong.net) to get your API key
   - You'll need this key to create checkout orders

2. **Install SDK**
   ```bash
   npm install @belongnet/sdk
   ```

## Implementation Steps

### 1. Create Checkout Order

```typescript
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
        mintPrice: 0.1,
        image: 'https://example.com/nft1.jpg',
        quantity: 1,
      },
    ],
  }),
})

const { data } = await response.json()
const checkoutId = data.checkoutId
```

### 2. Prepare HTML Container

```html
<div id="nft-checkout-frame"></div>
```

### 3. Initialize Checkout UI

```typescript
import { createPaymentFrame } from '@belongnet/sdk'

createPaymentFrame({
  el: document.getElementById('nft-checkout-frame'),
  params: {
    target: 'checkout',
    checkoutId: checkoutId,
    email: 'user@example.com',
  },
})
```

### 4. Handle Payment Events

```typescript
import { isPaymentEvent } from '@belongnet/sdk'

function handlePayment(e: MessageEvent) {
  if (isPaymentEvent(e)) {
    switch (e.data.type) {
      case 'payment-success':
        // logic for successful payment
        console.log('payment-success', e.data.payload)
        break
      case 'payment-error':
        // logic for payment error
        console.log('payment-error', e.data.payload)
        break
    }
  }
}

window.addEventListener('message', handlePayment)
```

## Complete Example

```typescript
import { createPaymentFrame, isPaymentEvent } from '@belongnet/sdk'

// 1. Create checkout order
async function createOrder() {
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
          mintPrice: 0.1,
          image: 'https://example.com/nft1.jpg',
          quantity: 1,
        },
      ],
    }),
  })

  const { data } = await response.json()
  return data.checkoutId
}

// 2. Initialize checkout
const checkoutId = await createOrder()

createPaymentFrame({
  el: document.getElementById('nft-checkout-frame'),
  params: {
    target: 'checkout',
    checkoutId: checkoutId,
    email: 'user@example.com',
  },
})

// 3. Handle events
function handlePayment(e: MessageEvent) {
  if (isPaymentEvent(e)) {
    switch (e.data.type) {
      case 'payment-success':
        // logic for successful payment
        console.log('payment-success', e.data.payload)
        break
      case 'payment-error':
        // logic for payment error
        console.log('payment-error', e.data.payload)
        break
    }
  }
}

window.addEventListener('message', handlePayment)
```

## Next Steps

- [Event Handling](./events.md)
- [Transaction Status](./checkout.md#getting-transaction-status)
- [Advanced Topics](./advanced.md)
