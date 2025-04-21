# Advanced Topics

## Customization Options

You can customize the checkout experience by providing additional parameters:

```ts
createPaymentFrame({
  el: document.getElementById('nft-checkout-frame'),
  origin: 'https://your-domain.com', // Custom origin for postMessage
  params: {
    target: PaymentTarget.Checkout,
    checkoutId: 'your-checkout-id',
    coupon: 'DISCOUNT10', // Optional coupon code
  },
})
```

## Security Considerations

1. **Origin Validation**

   ```typescript
   // Always validate message origin
   function handleMessage(e: MessageEvent) {
     if (e.origin !== 'https://your-domain.com') return
     // Process message
   }
   ```

2. **Data Validation**

   - Validate all input parameters
   - Sanitize user inputs
   - Verify transaction data

3. **Error Handling**
   - Implement proper error boundaries
   - Log errors appropriately
   - Provide user-friendly error messages

## Multiple NFT Purchase

```typescript
createPaymentFrame({
  el: document.getElementById('nft-checkout-frame'),
  params: {
    target: PaymentTarget.Checkout,
    checkoutId: 'your-checkout-id',
    tokens: [
      { id: 'token1', quantity: 2 },
      { id: 'token2', quantity: 1 },
    ],
  },
})
```

## Custom Styling

You can customize the appearance of the checkout frame:

```typescript
createPaymentFrame({
  el: document.getElementById('nft-checkout-frame'),
  params: {
    target: PaymentTarget.Checkout,
    checkoutId: 'your-checkout-id',
    theme: {
      colors: {
        primary: '#FF5733',
        secondary: '#33FF57',
        background: '#FFFFFF',
        text: '#000000',
      },
      borderRadius: '8px',
      fontFamily: 'Arial, sans-serif',
    },
  },
})
```

## Advanced Event Handling

### Retry Logic

```typescript
function handlePaymentWithRetry(maxRetries = 3) {
  let retryCount = 0

  function attemptPayment() {
    try {
      // Payment logic
    } catch (error) {
      if (retryCount < maxRetries) {
        retryCount++
        setTimeout(attemptPayment, 1000 * retryCount)
      } else {
        handleError(error)
      }
    }
  }

  attemptPayment()
}
```

## Performance Optimization

1. **Lazy Loading**

   ```typescript
   const loadCheckout = async () => {
     const { createPaymentFrame } = await import('@belongnet/sdk')
     // Initialize checkout
   }
   ```

2. **Resource Management**

   - Clean up event listeners
   - Dispose of unused resources
   - Implement proper garbage collection

3. **Error Boundaries**
   - Implement fallback UI
   - Handle network failures
   - Provide offline support
