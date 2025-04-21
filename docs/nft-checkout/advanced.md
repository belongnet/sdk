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

## URL Encoding

When working with email addresses in URLs and JSON, be aware of proper encoding:

### URL Parameters

The `@` symbol needs to be encoded as `%40` in URLs:

```typescript
// Incorrect - will cause issues in URLs
const email = 'test@email.com'

// Correct - encode the email for URL usage
const encodedEmail = encodeURIComponent('test@email.com') // results in 'test%40email.com'
```

### JSON Stringification

When converting objects with email to JSON, you might want to preserve the @ symbol:

```typescript
const params = {
  email: 'test@email.com',
  // other params...
}

// Custom stringify function to preserve @ in email
const stringifyWithEmailHandling = (obj: any) => {
  const str = JSON.stringify(obj, null, 2)
  return str.replace(/%40/g, '@')
}

// Use the custom function
const jsonString = stringifyWithEmailHandling(params)
```

### Best Practices for Email Handling

1. **URL Encoding**

   ```typescript
   const encodeEmail = (email: string) => encodeURIComponent(email)
   ```

2. **JSON Handling**

   ```typescript
   const stringifyWithEmail = (data: any) => {
     return JSON.stringify(data, null, 2).replace(/%40/g, '@')
   }
   ```

3. **Validation Helper**
   ```typescript
   const isValidEmail = (email: string) => {
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
     return emailRegex.test(email)
   }
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

### Transaction Monitoring

```typescript
async function monitorTransaction(txHash: string) {
  const maxAttempts = 10
  let attempts = 0

  while (attempts < maxAttempts) {
    const status = await checkTransactionStatus(txHash)
    if (status === 'confirmed') {
      handleSuccess()
      break
    }
    attempts++
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }
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
