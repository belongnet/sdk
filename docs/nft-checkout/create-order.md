# Creating NFT Checkout Order

Before implementing the checkout UI, you need to create an order using the Belong.net API.

## Getting API Access

To get your API key (`x-api-key`), please contact us at [join@belong.net](mailto:join@belong.net).
We will provide you with the necessary credentials and additional information to get started.

## API Endpoint

```bash
POST https://api.belong.net/api/v2/nft-checkout
```

### Headers

```bash
Content-Type: application/json
x-api-key: YOUR_API_KEY  # Contact join@belong.net to get your API key
```

## Request Body

```json
{
  "collectionId": "65f1c7a33e51d8e4c2a9b4d2",
  "items": [
    {
      "name": "Test NFT #1",
      "description": "Description for Test NFT #1",
      "mintPrice": 0.1,
      "image": "https://example.com/nft1.jpg",
      "quantity": 1,
      "externalUrl": "https://example.com/nft1"
    },
    {
      "name": "Test NFT #2",
      "description": "Description for Test NFT #2",
      "mintPrice": 0.2,
      "image": "https://example.com/nft2.jpg",
      "quantity": 2,
      "externalUrl": "https://example.com/nft2"
    }
  ]
}
```

### Parameters Description

- `collectionId` (required): Your NFT collection ID
- `items` (required): Array of items to be minted
  - `name` (required): Name of the NFT
  - `description`: Description of the NFT
  - `mintPrice` (required): Price in ETH
  - `image` (required): URL of the NFT image
  - `quantity` (required): Number of copies to mint
  - `externalUrl`: External URL associated with the NFT

## Response

```json
{
  "data": {
    "checkoutId": "checkout_id_here"
  }
}
```

### Using the Response

Use the `checkoutId` from the response to initialize the checkout UI:

```typescript
import { createPaymentFrame, PaymentTarget } from '@belongnet/sdk'

const { frame } = createPaymentFrame({
  el: document.getElementById('nft-checkout-frame'),
  params: {
    target: PaymentTarget.Checkout,
    checkoutId: 'checkout_id_here', // Use the checkoutId from the API response
  },
})
```

## Example API Call

Using fetch:

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
  return data.checkoutId
}
```

Using axios:

```typescript
import axios from 'axios'

async function createNftCheckout() {
  const { data } = await axios.post(
    'https://api.belong.net/api/v2/nft-checkout',
    {
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
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'YOUR_API_KEY',
      },
    }
  )

  return data.data.checkoutId
}
```
