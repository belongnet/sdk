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
  },
})
```

### 4. Handle Payment Events

```typescript
window.addEventListener('message', (e) => {
  if (e.origin !== 'https://checkout.belong.io') return

  switch (e.data.type) {
    case 'payment-success':
      console.log('Payment successful!')
      break
    case 'payment-error':
      console.log('Payment failed:', e.data.payload.message)
      break
  }
})
```

## Complete Example

```typescript
import { createPaymentFrame } from '@belongnet/sdk'

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
  },
})

// 3. Handle events
window.addEventListener('message', (e) => {
  if (e.origin !== 'https://checkout.belong.io') return

  switch (e.data.type) {
    case 'payment-success':
      console.log('Payment successful!')
      break
    case 'payment-error':
      console.log('Payment failed:', e.data.payload.message)
      break
  }
})
```

## Next Steps

- [Event Handling](./events.md)
- [Transaction Status](./checkout.md#getting-transaction-status)
- [Advanced Topics](./advanced.md)
