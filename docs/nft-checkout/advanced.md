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
    email: 'user@example.com',
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
