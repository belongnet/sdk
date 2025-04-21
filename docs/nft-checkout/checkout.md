# NFT Checkout

NFT Checkout provides a seamless way to sell NFTs directly on your website with a customizable checkout experience.

## Prerequisites

1. **NFT Collection**
   Before using NFT checkout, you need to create an NFT collection. See our [Collection Guide](../guides/collection.md) for detailed instructions.

2. **API Access**
   Contact [join@belong.net](mailto:join@belong.net) to get your API credentials.

## Implementation Steps

1. **Create Checkout Order**
   Create a checkout order using our [NFT Checkout API](./create-order.md). You'll receive a `checkoutId` in the response.

2. **Initialize Checkout Widget**
   Integrate the checkout widget into your website using the SDK. See our [Quick Start Guide](./quickstart.md) for implementation details.

3. **Handle Events**
   Set up event handlers to manage the checkout process. See [Event Handling](./events.md) for more information.

## Getting Transaction Status

You can monitor the status of a transaction using the following endpoint:

```typescript
GET https://api.belong.net/api/v2/nft-checkout/status/{checkoutId}
```

### Response Interpretation

The response will indicate the current status of your transaction:

- `confirmed` - Payment was successful, and NFT has been minted
- `pending` - Transaction is still being processed
- `failed` - Transaction failed or was rejected

If the status is `confirmed`, the response will include the NFT object with all relevant details (token ID, metadata, etc.).

### Example Implementation

```typescript
async function getTransactionStatus(checkoutId: string) {
  const response = await fetch(
    `https://api.belong.net/api/v2/nft-checkout/status/${checkoutId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'YOUR_API_KEY',
      },
    }
  )
  const { data } = await response.json()
  return data.status
}

// Usage with polling
async function monitorTransaction(checkoutId: string) {
  const maxAttempts = 10
  let attempts = 0

  while (attempts < maxAttempts) {
    const status = await getTransactionStatus(checkoutId)

    switch (status) {
      case 'confirmed':
        console.log('Transaction confirmed!')
        return status
      case 'pending':
        console.log('Transaction pending...')
        break
      case 'failed':
        console.log('Transaction failed')
        return status
    }

    attempts++
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  return 'timeout'
}
```

### Response Format

```typescript
interface StatusResponse {
  data: {
    status: 'pending' | 'confirmed' | 'failed'
    transaction?: {
      hash: string
      block_number?: number
    }
    nft?: {
      token_id: string
      token_uri: string
      metadata: {
        name: string
        description: string
        image: string
        attributes: Array<{
          trait_type: string
          value: string | number
        }>
      }
    }
    error?: {
      code: string
      message: string
    }
  }
}
```

### Best Practices

1. **Regular Polling**

   - Implement reasonable polling intervals (e.g., every 2-3 seconds)
   - Set a maximum number of retry attempts
   - Include timeout handling

2. **Error Handling**

   - Handle network errors gracefully
   - Provide user feedback during the waiting period
   - Have fallback mechanisms for failed requests

3. **User Experience**
   - Show loading states during status checks
   - Display clear success/failure messages
   - Provide transaction details when available

## Additional Resources

- [API Reference](./api-reference.md) - Complete API documentation
- [Advanced Topics](./advanced.md) - Advanced features and customization options
